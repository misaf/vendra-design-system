// Page behavior. Edit here, then run npm --prefix templates run build.
// The counter presentation: a seller at the shop shows a walk-in customer the designs large, finds
// one by its code, a flower, a kind or the QR code on its tag, opens it full screen, builds a
// shortlist to compare and an order to hand over, and passes either to the customer's phone as a
// QR code. Unattended, it can play the designs as a slideshow.
import {vfCopy} from './copy.js';
import {ToastQueue} from '../app/ds.js';
import {
  VF_ADDONS,
  VF_PRODUCTS,
  VF_SIZES,
  vfBagLine,
  vfFindProduct,
  vfLinesParam,
  vfProductImage,
  vfProductImages,
  vfReady,
  vfSearchProducts
} from '../_shared/catalog.js';
import {vfShell} from '../_shared/navigation.js';
import {vfRouteParams} from '../_shared/routing.js';
import {VF_CATEGORY_COPY} from '../_shared/translations/categories.js';
import {useLifecycle, usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';

// The counter settings, kept on this device (the shop's tablet). The PIN only keeps a curious
// customer out of the settings; it is stored on the tablet as it is.
const VF_PRESENTATION_KEY = 'vf-presentation';
const VF_PRESENTATION_SETTINGS = {
  showPrices: true,
  readyOnly: false,
  hideSoldOut: false,
  keepAwake: true,
  slideshow: false,
  pin: ''
};
// A search is reported once the typing settles, as on the search page.
const VF_SEARCH_SETTLE_MS = 1000;
// Untouched this long, the slideshow starts; it then moves on at this pace.
const VF_IDLE_MS = 60_000;
const VF_SLIDE_MS = 6_000;
// How often an open presentation asks the API what is in stock.
const VF_STOCK_MS = 120_000;
// How long "Cleared · Undo" stays.
const VF_UNDO_MS = 8_000;

function vfReadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(VF_PRESENTATION_KEY) || '{}') || {};
    return Object.fromEntries(
      Object.entries(VF_PRESENTATION_SETTINGS).map(([key, value]) => [
        key,
        typeof saved[key] === typeof value ? saved[key] : value
      ])
    );
  } catch {
    return {...VF_PRESENTATION_SETTINGS};
  }
}
function vfSaveSettings(settings) {
  try {
    localStorage.setItem(VF_PRESENTATION_KEY, JSON.stringify(settings));
  } catch {}
}

// The designs in the grid: the search's (or all of them), then the kind, Ready and stock filters.
function vfShownProducts(state) {
  const found = state.q.trim() ? vfSearchProducts(state.q) : VF_PRODUCTS;
  return found
    .filter(product => state.cat === 'all' || product.cat === state.cat)
    .filter(product => !state.settings.readyOnly || vfReady(product))
    .filter(product => !state.settings.hideSoldOut || product.inStock !== false);
}
// The designs the full-screen view moves through: the grid's, the shortlist, or one scanned design.
function vfViewerProducts(state) {
  if (state.source === 'shortlist') return state.shortlist.map(vfFindProduct).filter(Boolean);
  if (state.source === 'only') return [vfFindProduct(state.only)].filter(Boolean);
  return vfShownProducts(state);
}

// The full-screen view closed, with no size or extras chosen.
function vfViewerClosed() {
  return {
    open: null,
    source: 'shown',
    pick: {size: VF_SIZES[0].id, addons: []},
    optionsOpen: false
  };
}

// Holds the screen awake while the setting is on and the page is visible (the browser lets go of
// the lock whenever the page is hidden, so it is asked for again on return). One request at a time;
// a lock granted after the setting went off or the page went away is let go at once.
async function vfSyncWakeLock(page) {
  const wanted =
    !page._unmounted && page.state.settings.keepAwake && document.visibilityState === 'visible';
  if (!wanted) {
    if (page._wakeLock) page._wakeLock.release().catch(() => {});
    page._wakeLock = null;
    return;
  }
  if (page._wakeLock || page._wakeLockPending || !('wakeLock' in navigator)) return;
  page._wakeLockPending = true;
  try {
    const lock = await navigator.wakeLock.request('screen');
    lock.addEventListener('release', () => {
      if (page._wakeLock === lock) page._wakeLock = null;
    });
    page._wakeLock = lock;
  } catch {
    page._wakeLock = null;
  }
  page._wakeLockPending = false;
  vfSyncWakeLock(page);
}

// The slideshow: after VF_IDLE_MS without a touch or key it opens the first design and moves on
// every VF_SLIDE_MS. A touch stops it and leaves the design on screen, as the customer may want it.
function vfRestartIdle(page) {
  clearTimeout(page._idleTimer);
  clearInterval(page._slideTimer);
  if (page.state.slideshowRunning) page.setState({slideshowRunning: false});
  if (!page.state.settings.slideshow) return;
  page._idleTimer = setTimeout(() => {
    if (page.state.panel || page.state.send) return vfRestartIdle(page);
    const count = vfShownProducts(page.state).length;
    if (!count) return;
    // The slideshow shows each design at its own price, whatever was last chosen on screen.
    page.setState({...vfViewerClosed(), slideshowRunning: true, open: 0});
    page._slideTimer = setInterval(
      () =>
        page.setState({
          open: ((page.state.open || 0) + 1) % (vfShownProducts(page.state).length || 1)
        }),
      VF_SLIDE_MS
    );
  }, VF_IDLE_MS);
}

// The QR code on a design's tag holds its product page's address (or just its code).
function vfScannedProduct(text) {
  try {
    const id = new URL(text).searchParams.get('id');
    if (id) return vfFindProduct(id);
  } catch {}
  return vfFindProduct(text.trim());
}
function vfStopCamera(page) {
  clearTimeout(page._scanTimer);
  if (page._stream) page._stream.getTracks().forEach(track => track.stop());
  page._stream = null;
}
async function vfStartCamera(page) {
  const video = /** @type {HTMLVideoElement} */ (document.getElementById('vf-presentation-camera'));
  if (!video || page._stream) return;
  try {
    page._stream = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'},
      audio: false
    });
    if (page.state.panel !== 'scan') return vfStopCamera(page);
    video.srcObject = page._stream;
    // Reading starts at once: a camera that is slow to deliver frames only means a few empty reads.
    video.play().catch(() => {});
  } catch {
    vfStopCamera(page);
    page.setState({scanError: 'blocked'});
    return;
  }
  // @ts-ignore BarcodeDetector is not in the DOM types yet.
  const detector = new window.BarcodeDetector({formats: ['qr_code']});
  const look = async () => {
    if (!page._stream) return;
    try {
      const [code] = await detector.detect(video);
      if (code) {
        const product = vfScannedProduct(code.rawValue);
        if (product) {
          vfStopCamera(page);
          page.setState({panel: null, scanError: '', source: 'only', only: product.id, open: 0});
          return;
        }
        page.setState({scanError: 'unknown'});
      }
    } catch {}
    page._scanTimer = setTimeout(look, 250);
  };
  look();
}

// Asks the API what is in stock and marks the catalog's products, so a design that sells out
// during the day leaves the presentation (with "Hide sold-out designs") or shows as sold out. The
// design on screen stays on screen as the list around it changes; if it left the list, the
// full-screen view closes.
function vfRefreshStock(page) {
  window.VF_API.loadStock()
    .then(stock => {
      if (!stock) return;
      const {open} = page.state;
      const onScreen = open == null ? null : vfViewerProducts(page.state)[open];
      VF_PRODUCTS.forEach(product => {
        if (stock[product.id]) product.inStock = stock[product.id].inStock;
      });
      const index = onScreen ? vfViewerProducts(page.state).indexOf(onScreen) : -1;
      page.setState({
        stockAt: Date.now(),
        ...(onScreen ? (index >= 0 ? {open: index} : vfViewerClosed()) : {})
      });
    })
    .catch(() => {});
}

export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      q: '',
      cat: 'all',
      settings: vfReadSettings(),
      source: 'shown',
      only: '',
      open: null,
      pick: {size: VF_SIZES[0].id, addons: []},
      // The size and extras choices stay folded away, so the photo keeps the screen.
      optionsOpen: false,
      shortlist: [],
      order: [],
      justAdded: '',
      // A dialog over the page: settings, unlock, shortlist, order or scan.
      panel: null,
      // What the send dialog hands over: {kind: 'product' | 'shortlist' | 'order', id}.
      send: null,
      copied: false,
      pinEntry: '',
      pinError: false,
      pinDraft: '',
      scanError: '',
      slideshowRunning: false,
      fullscreen: false,
      stockAt: 0
    };
    page.toasts = new ToastQueue({maxVisibleToasts: 1});
    page._report = text => {
      clearTimeout(page._searchTimer);
      if (!text.trim()) return;
      page._searchTimer = setTimeout(
        () =>
          window.VF_TRACK.event('search', {
            search_term: text,
            results: vfShownProducts(page.state).length
          }),
        VF_SEARCH_SETTLE_MS
      );
    };
  });
  useStorefrontPage(page);
  useLifecycle(page, {
    didMount() {
      page._onVisibility = () => vfSyncWakeLock(page);
      page._onFullscreen = () => page.setState({fullscreen: !!document.fullscreenElement});
      // "/" jumps to the search, unless the seller is typing or a dialog is open.
      page._onKey = event => {
        const target = /** @type {HTMLElement} */ (event.target);
        if (event.key !== '/' || event.defaultPrevented) return;
        if (target.closest('input, textarea, select, [role=dialog]')) return;
        event.preventDefault();
        document.getElementById('vf-presentation-q')?.focus();
      };
      page._onActivity = () => vfRestartIdle(page);
      document.addEventListener('visibilitychange', page._onVisibility);
      document.addEventListener('fullscreenchange', page._onFullscreen);
      document.addEventListener('keydown', page._onKey);
      for (const type of ['pointerdown', 'keydown'])
        document.addEventListener(type, page._onActivity, true);
      vfSyncWakeLock(page);
      vfRestartIdle(page);
      if (window.VF_API.live) {
        vfRefreshStock(page);
        page._stockTimer = setInterval(() => vfRefreshStock(page), VF_STOCK_MS);
      }
    },
    willUnmount() {
      page._unmounted = true;
      clearTimeout(page._searchTimer);
      clearTimeout(page._copiedTimer);
      clearTimeout(page._addedTimer);
      clearTimeout(page._idleTimer);
      clearInterval(page._slideTimer);
      clearInterval(page._stockTimer);
      vfStopCamera(page);
      document.removeEventListener('visibilitychange', page._onVisibility);
      document.removeEventListener('fullscreenchange', page._onFullscreen);
      document.removeEventListener('keydown', page._onKey);
      for (const type of ['pointerdown', 'keydown'])
        document.removeEventListener(type, page._onActivity, true);
      page.toasts.clear();
      if (page._wakeLock) page._wakeLock.release().catch(() => {});
    }
  });
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'presentation');
  const L = S.lang;
  const C = vfCopy(S);
  const st = page.state;
  const products = vfShownProducts(st);
  const viewerProducts = vfViewerProducts(st);
  const setting = key => value => {
    const settings = {...page.state.settings, [key]: value};
    vfSaveSettings(settings);
    page.setState({settings, ...vfViewerClosed()});
    if (key === 'keepAwake') vfSyncWakeLock(page);
    if (key === 'slideshow') vfRestartIdle(page);
  };
  const absolute = href => new URL(href, location.href).href;
  const prefix = page.props.go ? '' : '../app/';
  const inShortlist = id => st.shortlist.includes(id);
  const toggleShortlist = id =>
    page.setState({
      shortlist: inShortlist(id) ? st.shortlist.filter(x => x !== id) : [...st.shortlist, id]
    });
  // The price a design comes to in the size and with the extras chosen for it on screen.
  const quote = product => vfBagLine(product, st.pick.size, st.pick.addons);
  const orderTotal = st.order.reduce((sum, line) => sum + line.unit * line.qty, 0);
  const setOrder = order => page.setState({order});
  // Clearing the shortlist or the order closes its dialog and can be undone for a few seconds, as one
  // tap clears it.
  const clearWithUndo = (key, title) => {
    const kept = page.state[key];
    page.setState({[key]: [], panel: null});
    page.toasts.clear();
    page.toasts.add(
      {
        title,
        action: {
          label: C.undo,
          onClick: () => {
            page.setState({[key]: kept});
            page.toasts.clear();
          }
        }
      },
      {timeout: VF_UNDO_MS}
    );
  };
  // What the send dialog hands over, as a link for the customer's phone.
  const sendInfo = (() => {
    if (!st.send) return null;
    if (st.send.kind === 'product') {
      const product = vfFindProduct(st.send.id);
      if (!product) return null;
      return {
        title: C.sendTitle.replace('{code}', product.id),
        body: C.sendBody,
        qrLabel: C.qr.replace('{code}', product.id),
        code: product.id,
        url: absolute(S.productLink(product.id).href),
        tag: true
      };
    }
    if (st.send.kind === 'shortlist')
      return {
        title: C.shortlistTitle,
        body: C.shortlistBody,
        qrLabel: C.qr.replace('{code}', C.shortlist),
        code: '',
        url: absolute(prefix + vfRouteParams({lang: L, view: 'saved', ids: st.shortlist.join(',')}))
      };
    return {
      title: C.orderTitle,
      body: C.handOverBody,
      qrLabel: C.qr.replace('{code}', C.order),
      code: '',
      url: absolute(prefix + vfRouteParams({lang: L, view: 'bag', lines: vfLinesParam(st.order)}))
    };
  })();
  const kinds = ['all', ...new Set(VF_PRODUCTS.map(product => product.cat))];
  // Only the photo, the code and the price: the presentation shows designs, not their details.
  const card = product => ({
    id: product.id,
    code: product.id,
    price: S.m(product.price),
    image: vfProductImage(product, L),
    ready: vfReady(product),
    soldOut: product.inStock === false
  });
  return {
    ...S,
    t: {...S.t, ...C},
    toasts: page.toasts,
    q: st.q,
    setQ: value => {
      page.setState({q: value, open: null, source: 'shown'});
      page._report(value);
    },
    // Enter opens the design straight away when the search found exactly one.
    submitQ: () => {
      if (products.length === 1) page.setState({source: 'shown', open: 0});
    },
    kinds: kinds.map(cat => ({
      id: cat,
      label: VF_CATEGORY_COPY[L][cat],
      selected: st.cat === cat,
      pick: () => page.setState({cat, open: null, source: 'shown'})
    })),
    countLabel: C.count(products.length),
    noResults: !products.length,
    showAll: () => {
      page.setState({q: '', cat: 'all'});
      const settings = page.state.settings;
      if (settings.readyOnly || settings.hideSoldOut) {
        const next = {...settings, readyOnly: false, hideSoldOut: false};
        vfSaveSettings(next);
        page.setState({settings: next});
      }
      S.focus('vf-presentation-q');
    },
    showPrices: st.settings.showPrices,
    tiles: products.map((product, index) => ({
      ...card(product),
      // The tile's name carries what it shows: the code, the price (when shown) and Ready/Sold out.
      openLabel: [
        C.open.replace('{code}', product.id),
        st.settings.showPrices ? S.m(product.price) : '',
        vfReady(product) ? C.ready : '',
        product.inStock === false ? C.soldOut : ''
      ]
        .filter(Boolean)
        .join(', '),
      open: () => page.setState({source: 'shown', open: index}),
      starred: inShortlist(product.id),
      starLabel: (inShortlist(product.id) ? C.removeShortlist : C.addShortlist).replace(
        '{code}',
        product.id
      ),
      star: () => toggleShortlist(product.id)
    })),
    // The full-screen view: each design with its size and extras choices (for the one on screen).
    open: st.open,
    slideshowRunning: st.slideshowRunning,
    setOpen: index =>
      page.setState({
        open: index,
        pick: {size: VF_SIZES[0].id, addons: []},
        optionsOpen: false,
        justAdded: ''
      }),
    closeViewer: () => page.setState(vfViewerClosed()),
    optionsOpen: st.optionsOpen,
    toggleOptions: () => page.setState({optionsOpen: !page.state.optionsOpen}),
    viewer: viewerProducts.map(product => {
      const line = quote(product);
      const addons = VF_ADDONS.filter(addon => !(product.noAddons || []).includes(addon.id));
      return {
        ...card(product),
        images: vfProductImages(product, L),
        starred: inShortlist(product.id),
        starLabel: (inShortlist(product.id) ? C.removeShortlist : C.addShortlist).replace(
          '{code}',
          product.id
        ),
        star: () => toggleShortlist(product.id),
        sizes: product.sizes
          ? VF_SIZES.map(size => ({
              id: size.id,
              label: size.name[L] + ' · ' + size.detail[L],
              selected: line.size === size.id,
              pick: () => page.setState({pick: {...page.state.pick, size: size.id}})
            }))
          : [],
        addons: addons.map(addon => ({
          id: addon.id,
          label: addon.name[L],
          selected: line.addons.includes(addon.id),
          pick: () => {
            const chosen = page.state.pick.addons;
            page.setState({
              pick: {
                ...page.state.pick,
                addons: chosen.includes(addon.id)
                  ? chosen.filter(id => id !== addon.id)
                  : [...chosen, addon.id]
              }
            });
          }
        })),
        quote: S.m(line.unit),
        added: st.justAdded === line.id,
        addToOrder: () => {
          if (product.inStock === false) return;
          const current = page.state.order;
          const same = current.find(item => item.id === line.id);
          page.setState({
            order: same
              ? current.map(item => (item.id === line.id ? {...item, qty: item.qty + 1} : item))
              : [...current, line],
            justAdded: line.id
          });
          clearTimeout(page._addedTimer);
          page._addedTimer = setTimeout(() => page.setState({justAdded: ''}), 2000);
        },
        sendIt: () => page.setState({send: {kind: 'product', id: product.id}, copied: false})
      };
    }),
    // The send dialog.
    send: sendInfo
      ? {
          ...sendInfo,
          whatsapp:
            'https://wa.me/?text=' +
            encodeURIComponent((sendInfo.code ? sendInfo.code + '\n' : '') + sendInfo.url),
          copied: st.copied,
          copy: () =>
            navigator.clipboard?.writeText(sendInfo.url).then(
              () => {
                page.setState({copied: true});
                clearTimeout(page._copiedTimer);
                page._copiedTimer = setTimeout(() => page.setState({copied: false}), 2000);
              },
              () => {}
            ),
          print: () => window.print()
        }
      : null,
    closeSend: () => page.setState({send: null}),
    // The shortlist, side by side.
    shortlistCount: st.shortlist.length,
    shortlistLabel: C.shortlistCount(st.shortlist.length),
    shortlist: st.shortlist
      .map(vfFindProduct)
      .filter(Boolean)
      .map((product, index) => ({
        ...card(product),
        show: () => page.setState({panel: null, source: 'shortlist', open: index}),
        remove: () => toggleShortlist(product.id)
      })),
    shortlistOpen: st.panel === 'shortlist',
    openShortlist: () => page.setState({panel: 'shortlist'}),
    clearShortlist: () => clearWithUndo('shortlist', C.shortlistCleared),
    sendShortlist: () =>
      page.setState({panel: null, send: {kind: 'shortlist', id: ''}, copied: false}),
    // The order built at the counter.
    orderCount: st.order.reduce((sum, line) => sum + line.qty, 0),
    orderLabel: C.orderCount(st.order.reduce((sum, line) => sum + line.qty, 0)),
    orderLines: st.order.map(line => ({
      id: line.id,
      image: vfProductImage(vfFindProduct(line.productId), L),
      name: line.token,
      meta: line[L][1],
      price: S.m(line.unit * line.qty),
      quantity: line.qty,
      setQuantity: qty =>
        setOrder(page.state.order.map(item => (item.id === line.id ? {...item, qty} : item))),
      remove: () => setOrder(page.state.order.filter(item => item.id !== line.id))
    })),
    orderTotal: S.m(orderTotal),
    orderOpen: st.panel === 'order',
    openOrder: () => page.setState({panel: 'order'}),
    clearOrder: () => clearWithUndo('order', C.orderCleared),
    handOver: () => page.setState({panel: null, send: {kind: 'order', id: ''}, copied: false}),
    closePanel: () => {
      vfStopCamera(page);
      page.setState({panel: null, pinEntry: '', pinError: false, scanError: ''});
    },
    // Settings, behind the PIN when one is set.
    settingsOpen: st.panel === 'settings',
    unlockOpen: st.panel === 'unlock',
    openSettings: () =>
      page.setState({panel: st.settings.pin ? 'unlock' : 'settings', pinDraft: ''}),
    pinEntry: st.pinEntry,
    pinError: st.pinError,
    setPinEntry: value => page.setState({pinEntry: value, pinError: false}),
    checkPin: value =>
      value === page.state.settings.pin
        ? page.setState({panel: 'settings', pinEntry: ''})
        : page.setState({pinEntry: '', pinError: true}),
    settings: st.settings,
    setShowPrices: setting('showPrices'),
    setReadyOnly: setting('readyOnly'),
    setHideSoldOut: setting('hideSoldOut'),
    setKeepAwake: setting('keepAwake'),
    setSlideshow: setting('slideshow'),
    pinDraft: st.pinDraft,
    hasPin: !!st.settings.pin,
    setPinDraft: value => page.setState({pinDraft: value}),
    savePin: value => {
      setting('pin')(value);
      page.setState({pinDraft: ''});
    },
    removePin: () => setting('pin')(''),
    canFullscreen: typeof document !== 'undefined' && !!document.fullscreenEnabled,
    fullscreen: st.fullscreen,
    setFullscreen: on => {
      const request = on
        ? document.documentElement.requestFullscreen()
        : document.fullscreenElement
          ? document.exitFullscreen()
          : null;
      if (request) request.catch(() => {});
    },
    // Scanning a design's tag (where the browser can read QR codes from the camera).
    canScan: typeof window !== 'undefined' && 'BarcodeDetector' in window,
    scanOpen: st.panel === 'scan',
    openScan: () => page.setState({panel: 'scan', scanError: ''}, () => vfStartCamera(page)),
    scanMessage:
      st.scanError === 'unknown' ? C.scanUnknown : st.scanError === 'blocked' ? C.scanBlocked : ''
  };
}
