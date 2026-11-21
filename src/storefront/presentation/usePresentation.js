// Page behavior. Edit here, then run npm run build.
// The counter presentation: a seller at the shop shows a walk-in customer the designs large, finds
// one by its code, a flower, a kind or the QR code on its tag, opens it full screen, builds a
// shortlist to compare and an order to hand over, and passes either to the customer's phone as a
// QR code. Unattended, it can play the designs as a slideshow.
import {VF_NAV} from '../../platform/browser/page-focus.js';
import {vfCopy} from './copy.js';
import {vfCreateCamera} from './camera-scanner.js';
import {
  vfCreateDisplay,
  vfDisplayImageKey,
  vfDisplayItems,
  vfDisplayProducts
} from './display-rotation.js';
import {
  VF_CUSTOMER,
  vfCreateBrowsingViewer,
  vfCustomerKept,
  vfShownProducts,
  vfViewerClosed,
  vfViewerProducts
} from './browsing-viewer.js';
import {
  VF_COLLECTION_NAME_LIMIT,
  VF_MAX_COLLECTIONS,
  VF_SETUP_TEXT_LIMIT,
  vfImportSetup,
  vfNormalizeSettings,
  vfParseCollections,
  vfParseSettings,
  vfPortableSettings,
  vfSerializeSetup,
  vfSetupLink,
  vfSharedSetup
} from './presentation-settings.js';
import {ToastQueue} from '../../design-system/components/ToastRegion/ToastRegion.jsx';
import {
  VF_ADDONS,
  VF_PRODUCTS,
  VF_SAVED_IDS_PATTERN,
  VF_SIZES,
  vfFindProduct,
  vfProductImage,
  vfProductImages,
  vfReady,
  vfSearchProducts
} from '../catalog/catalog.js';
import {VF_LINES_PATTERN, vfBagLine, vfLinesParam} from '../cart/cart-lines.js';
import {vfShellNavigation} from '../shell/navigation.js';
import {vfSeparator} from '../pricing/formatting.js';
import {vfReadRoute, vfRouteUrl} from '../shell/routing.js';
import {VF_CATEGORY_COPY} from '../catalog/categories.js';
import {useLifecycle, usePageLogic} from '../shell/page-state.js';
import {vfLocation, vfOnServer, vfStoredValue} from '../../platform/browser/environment.js';
import {useStorefrontPage} from '../shell/page-lifecycle.js';
import {vfRuntime} from '../../platform/browser/runtime.js';

const VF_PRESENTATION_KEY = 'vf-presentation';
const VF_COLLECTIONS_KEY = 'vf-presentation-collections';

function vfReadSettings() {
  return vfParseSettings(vfStoredValue(VF_PRESENTATION_KEY), VF_PRODUCTS);
}

function vfReadCollections() {
  return vfParseCollections(vfStoredValue(VF_COLLECTIONS_KEY), VF_PRODUCTS);
}

function vfStoreCollections(collections) {
  try {
    localStorage.setItem(VF_COLLECTIONS_KEY, JSON.stringify(collections));
  } catch {}
}
function vfSaveSettings(settings) {
  try {
    localStorage.setItem(VF_PRESENTATION_KEY, JSON.stringify(settings));
  } catch {}
}

// A search is reported once the typing settles, as on the search page.
const VF_SEARCH_SETTLE_MS = 1000;
// How often an open presentation asks the API what is in stock.
const VF_STOCK_MS = 120_000;
// Holds the screen awake while the setting is on and the page is visible (the browser lets go of
// the lock whenever the page is hidden, so it is asked for again on return). One request at a time;
// a lock granted after the setting went off or the page went away is let go at once.
async function vfSyncWakeLock(page) {
  const wanted =
    !page._unmounted && page.state.settings.keepAwake && document.visibilityState === 'visible';
  if (!wanted) {
    if (page._wakeLock) page._wakeLock.release().catch(() => {});
    page._wakeLock = null;
    if (!page._unmounted && page.state.wakeStatus !== 'inactive')
      page.setState({wakeStatus: 'inactive'});
    return;
  }
  if (!('wakeLock' in navigator)) return;
  if (page._wakeLock || page._wakeLockPending) return;
  page.setState({wakeStatus: 'requesting'});
  page._wakeLockPending = true;
  try {
    const lock = await navigator.wakeLock.request('screen');
    lock.addEventListener('release', () => {
      if (page._wakeLock === lock) {
        page._wakeLock = null;
        if (!page._unmounted) page.setState({wakeStatus: 'inactive'});
      }
    });
    page._wakeLock = lock;
    if (!page._unmounted) page.setState({wakeStatus: 'active'});
  } catch {
    page._wakeLock = null;
    if (!page._unmounted) page.setState({wakeStatus: 'denied'});
  }
  page._wakeLockPending = false;
  // Reconcile a granted lock with settings/visibility that changed while it was pending.
  // A rejection waits for the next visibility change or setting toggle instead of retrying.
  if (page._wakeLock) vfSyncWakeLock(page);
}

// Asks the API what is in stock and marks the catalog's products, so a design that sells out
// during the day leaves the presentation (with "Hide sold-out designs") or shows as sold out. The
// design on screen stays on screen as the list around it changes; if it left the list, the
// full-screen view closes.
function vfRefreshStock(page) {
  vfRuntime.api
    .loadStock()
    .then(stock => {
      if (page._unmounted || !stock) return;
      const {open} = page.state;
      const onScreen = open == null ? null : vfViewerProducts(page.state)[open];
      VF_PRODUCTS.forEach(product => {
        if (stock[product.id]) product.inStock = stock[product.id].inStock;
      });
      const index = onScreen ? vfViewerProducts(page.state).indexOf(onScreen) : -1;
      page.setState({
        stockAt: Date.now(),
        stockIssue: false,
        ...(onScreen ? (index >= 0 ? {open: index} : vfViewerClosed()) : {})
      });
    })
    .catch(() => {
      if (!page._unmounted) page.setState({stockIssue: true});
    });
}

// A tag contains either the product page address or the design code.
function vfScannedProduct(text) {
  try {
    const route = vfReadRoute(new URL(text).href);
    if (route.view === 'product') return vfFindProduct(route.id);
  } catch {}
  return vfFindProduct(text.trim());
}

export function usePresentation(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      q: '',
      cat: 'all',
      setupDone: !!vfStoredValue('vf-display-setup-done'),
      collections: vfReadCollections(),
      collectionName: '',
      activeCollection: '',
      collectionQuery: '',
      transferText: vfSharedSetup(typeof location === 'undefined' ? '' : location.href),
      transferError: false,
      setupFullscreen: false,
      wakeStatus: 'unsupported',
      browsing: false,
      displayIndex: 0,
      pendingIndex: null,
      preloadVersion: 0,
      displayIssue: false,
      failedImageKeys: [],
      online: vfOnServer() || typeof navigator === 'undefined' || navigator.onLine !== false,
      stockIssue: false,
      displayLandscape: false,
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
      calm: false,
      // The shortlist and order last handed over to a customer's phone.
      handed: {shortlist: null, order: null},
      fullscreen: false,
      stockAt: 0
    };
    page.display = vfCreateDisplay(page);
    page.camera = vfCreateCamera(page, vfScannedProduct);
    page.browsingViewer = vfCreateBrowsingViewer(page);
    page.toasts = new ToastQueue({maxVisibleToasts: 1});
    page._report = text => {
      clearTimeout(page._searchTimer);
      if (!text.trim()) return;
      page._searchTimer = setTimeout(
        () =>
          vfRuntime.track.event('search', {
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
      page._unmounted = false;
      // What this browser can do (wake lock, clipboard, QR scanning) and its own address are read
      // from here on: the build's prerender knows neither, and hydration renders as it did.
      page.setState({
        mounted: true,
        setupDone: !!vfStoredValue('vf-display-setup-done'),
        collections: vfReadCollections(),
        settings: vfReadSettings(),
        online: navigator.onLine !== false
      });
      page.display.mount();
      page._onConnection = () => {
        const online = navigator.onLine !== false;
        page.setState({online, ...(online ? {preloadVersion: page.state.preloadVersion + 1} : {})});
        if (online && vfRuntime.api.live) vfRefreshStock(page);
      };
      window.addEventListener('online', page._onConnection);
      window.addEventListener('offline', page._onConnection);
      page._onVisibility = () => {
        vfSyncWakeLock(page);
        page.display.sync();
      };
      page._onFullscreen = () => page.setState({fullscreen: !!document.fullscreenElement});
      // "/" jumps to the search, unless the seller is typing or a dialog is open.
      page._onKey = event => {
        const target = /** @type {HTMLElement} */ (event.target);
        if (event.defaultPrevented) return;
        if (page.state.settings.displayMode === 'tv' && page.state.panel) {
          if (event.key === 'Enter' && target.matches('input[type=checkbox], input[type=radio]')) {
            event.preventDefault();
            target.click();
            return;
          }

          if (['Escape', 'BrowserBack', 'GoBack'].includes(event.key)) {
            event.preventDefault();
            page.setState({panel: 'tools' === page.state.panel ? null : 'tools'});
            return;
          }
          const dialog = target.closest('[role=dialog]');
          const composite = target.closest(
            'select, [role=listbox], [role=option], [role=combobox], [role=spinbutton], [role=tablist]'
          );
          if (
            target.matches('input:not([type=checkbox]):not([type=radio]), textarea') &&
            ['ArrowLeft', 'ArrowRight'].includes(event.key)
          )
            return;
          if (
            dialog &&
            !composite &&
            ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)
          ) {
            const controls = Array.from(
              dialog.querySelectorAll(
                'button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), summary, [tabindex="0"]'
              )
            ).filter(
              element =>
                element.getClientRects().length && element.getAttribute('aria-hidden') !== 'true'
            );
            if (controls.length) {
              event.preventDefault();
              const index = controls.indexOf(target);
              const next =
                index < 0
                  ? ['ArrowDown', 'ArrowRight'].includes(event.key)
                    ? 0
                    : controls.length - 1
                  : (index +
                      (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1) +
                      controls.length) %
                    controls.length;
              /** @type {HTMLElement} */ (controls[next]).focus();
            }
            return;
          }
        }

        if (
          !page.state.browsing &&
          !page.state.panel &&
          !page.state.send &&
          !target.closest('input, textarea, select')
        ) {
          // A TV remote can open the seller drawer before anything on the page has focus.
          if (event.key === 'Enter' && !target.closest('button, a')) {
            event.preventDefault();
            page.setState({panel: 'tools'});
            return;
          }
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            const next = (event.key === 'ArrowRight') !== (page.props.lang === 'fa');
            page.display.step(next ? 1 : -1);
            return;
          }
        }
        if (event.key !== '/') return;
        if (target.closest('input, textarea, select, [role=dialog]')) return;
        event.preventDefault();
        page.setState({browsing: true, panel: null}, () =>
          document.getElementById('vf-presentation-q')?.focus()
        );
      };
      document.addEventListener('visibilitychange', page._onVisibility);
      document.addEventListener('fullscreenchange', page._onFullscreen);
      document.addEventListener('keydown', page._onKey);
      vfSyncWakeLock(page);
      page.browsingViewer.mount();
      page.display.sync();
      if (vfRuntime.api.live) {
        vfRefreshStock(page);
        page._stockTimer = setInterval(() => vfRefreshStock(page), VF_STOCK_MS);
      }
    },
    didUpdate() {
      if (page.state.panel !== 'scan') page.camera.stop();
      page.display.sync();
    },
    willUnmount() {
      page._unmounted = true;
      window.removeEventListener('online', page._onConnection);
      window.removeEventListener('offline', page._onConnection);
      clearTimeout(page._searchTimer);
      clearTimeout(page._copiedTimer);
      clearTimeout(page._addedTimer);
      page.browsingViewer.dispose();
      clearInterval(page._stockTimer);
      page.display.dispose();
      page.camera.stop();
      document.removeEventListener('visibilitychange', page._onVisibility);
      document.removeEventListener('fullscreenchange', page._onFullscreen);
      document.removeEventListener('keydown', page._onKey);
      page.toasts.clear();
      if (page._wakeLock) page._wakeLock.release().catch(() => {});
    }
  });
  return vals(page);
}

function vals(page) {
  const S = vfShellNavigation(page, 'presentation');
  const L = S.lang;
  const C = vfCopy(S);
  const st = page.state;
  const products = vfShownProducts(st);
  const displayPool = vfDisplayProducts(st);
  const viewerProducts = vfViewerProducts(st);
  const setting = key => value => {
    const settings = {...page.state.settings, [key]: value};
    vfSaveSettings(settings);
    const collectionChanged = ['displayCollection', 'displayCategory', 'displayIds'].includes(key);
    page.setState({
      settings,
      ...vfViewerClosed(),
      ...(collectionChanged ? {displayIndex: 0, pendingIndex: null} : {})
    });
    if (key === 'keepAwake') vfSyncWakeLock(page);
    if (key === 'slideshow') page.browsingViewer.restartIdle();
    page.display.sync();
  };
  const absolute = href => new URL(href, location.href).href;
  const inShortlist = id => st.shortlist.includes(id);
  // From the latest state, so quick taps on several stars all count.
  const toggleShortlist = id => {
    const shortlist = page.state.shortlist;
    page.setState({
      shortlist: shortlist.includes(id) ? shortlist.filter(x => x !== id) : [...shortlist, id]
    });
  };
  // The price a design comes to in the size and with the extras chosen for it on screen.
  const quote = product => vfBagLine(product, st.pick.size, st.pick.addons);
  // A design that sold out after it was ordered stays in the order, marked, so the seller can tell
  // the customer; it is left out of the total and of what is handed over (the phone would drop it).
  const lineSoldOut = line => vfFindProduct(line.productId)?.inStock === false;
  const available = st.order.filter(line => !lineSoldOut(line));
  const orderTotal = available.reduce((sum, line) => sum + line.unit * line.qty, 0);
  const setOrder = order => page.setState({order});
  // Clearing the shortlist or the order closes its dialog and can be undone, as one tap clears it. The
  // Undo toast stays until it is used, dismissed or replaced (a toast with an action never times out).
  const clearWithUndo = (patch, title) => {
    const kept = vfCustomerKept(page.state, Object.keys(patch));
    page.setState({...patch, ...vfViewerClosed(), panel: null});
    page.toasts.clear();
    page.toasts.add({
      title,
      action: {
        label: C.undo,
        onClick: () => {
          page.setState(kept);
          page.toasts.clear();
        }
      }
    });
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
        url: absolute(
          vfRouteUrl({
            lang: L,
            view: 'product',
            id: product.id,
            cat: product.cat,
            size: st.send.size,
            addons: st.send.addons
          })
        ),
        tag: true
      };
    }
    if (st.send.kind === 'shortlist')
      return {
        title: C.shortlistTitle,
        body: C.shortlistBody,
        qrLabel: C.qr.replace('{code}', C.shortlist),
        code: '',
        url: absolute(vfRouteUrl({lang: L, view: 'saved', ids: st.shortlist.join(',')})),
        // Longer than a link may carry, the customer's phone would open an empty list.
        tooLong: !VF_SAVED_IDS_PATTERN.test(st.shortlist.join(',')),
        tooLongBody: C.shortlistTooLong
      };
    return {
      title: C.orderTitle,
      body: C.handOverBody,
      qrLabel: C.qr.replace('{code}', C.order),
      code: '',
      url: absolute(vfRouteUrl({lang: L, view: 'bag', lines: vfLinesParam(available)})),
      tooLong: !VF_LINES_PATTERN.test(vfLinesParam(available)),
      tooLongBody: C.orderTooLong
    };
  })();
  const kinds = ['all', ...new Set(VF_PRODUCTS.map(product => product.cat))];
  // Only the photo, the code and the price: the presentation shows designs, not their details.
  const card = product => ({
    id: product.id,
    code: product.id,
    price: S.m(product.price),
    image: vfProductImage(product, L),
    imageKey: vfDisplayImageKey(product, L),
    unavailableImage: st.failedImageKeys.includes(vfDisplayImageKey(product, L)),
    ready: vfReady(product),
    soldOut: product.inStock === false
  });
  return {
    ...S,
    t: {...S.t, ...C},
    toasts: page.toasts,
    setupDone: st.setupDone,
    isSetup: st.panel === 'setup',
    openSetup: () => page.setState({panel: st.settings.pin ? 'unlock' : 'setup'}),
    setupFullscreen: st.setupFullscreen,
    setSetupFullscreen: value => page.setState({setupFullscreen: value}),
    startDisplay: () => {
      if (!vfDisplayProducts(page.state).length) return;
      if (page.state.setupFullscreen && document.fullscreenEnabled)
        document.documentElement.requestFullscreen().catch(() => {});
      try {
        localStorage.setItem('vf-display-setup-done', '1');
      } catch {}
      page.setState({setupDone: true, panel: null, browsing: false});
    },
    canStartDisplay: !!displayPool.length,
    wakeStatus: st.wakeStatus,
    canWake: !!st.mounted && 'wakeLock' in navigator,
    collectionName: st.collectionName,
    setCollectionName: value =>
      page.setState({collectionName: value.slice(0, VF_COLLECTION_NAME_LIMIT)}),
    savedCollections: st.collections.map(item => ({value: item.name, label: item.name})),
    activeCollection: st.activeCollection,
    loadCollection: name => {
      const saved = page.state.collections.find(item => item.name === name);
      if (!saved) return;
      const settings = {
        ...vfNormalizeSettings(saved.settings, VF_PRODUCTS),
        pin: page.state.settings.pin
      };
      vfSaveSettings(settings);
      page.setState({
        settings,
        activeCollection: name,
        collectionName: name,
        displayIndex: 0,
        pendingIndex: null
      });
    },
    canSaveCollection:
      !!st.collectionName.trim() &&
      !!displayPool.length &&
      (st.collections.length < VF_MAX_COLLECTIONS ||
        st.collections.some(item => item.name === st.collectionName.trim())),
    saveCollection: () => {
      const name = page.state.collectionName.trim();
      if (!name || !vfDisplayProducts(page.state).length) return;
      const current = page.state.collections;
      if (current.length >= VF_MAX_COLLECTIONS && !current.some(item => item.name === name)) return;
      const collections = [
        ...current.filter(item => item.name !== name),
        {name, settings: vfPortableSettings(page.state.settings, VF_PRODUCTS)}
      ];
      vfStoreCollections(collections);
      page.setState({collections, activeCollection: name});
    },
    deleteCollection: () => {
      const collections = page.state.collections.filter(
        item => item.name !== page.state.activeCollection
      );
      vfStoreCollections(collections);
      page.setState({collections, activeCollection: '', collectionName: ''});
    },
    collectionQuery: st.collectionQuery,
    setCollectionQuery: value => page.setState({collectionQuery: value}),
    selectedCount: st.settings.displayIds.length,
    eligibleCount: displayPool.length,
    previewProducts: displayPool.slice(0, 4).map(card),
    transferText: st.transferText,
    transferError: st.transferError,
    setTransferText: value =>
      page.setState({transferText: value.slice(0, VF_SETUP_TEXT_LIMIT), transferError: false}),
    exportSetup: () =>
      page.setState({transferText: vfSerializeSetup(page.state.settings, VF_PRODUCTS)}),
    setupLink: vfSetupLink(
      st.mounted ? location.href : 'http://localhost' + vfLocation().pathname,
      L,
      st.settings,
      VF_PRODUCTS
    ),
    importSetup: () => {
      const settings = vfImportSetup(page.state.transferText, page.state.settings.pin, VF_PRODUCTS);
      if (!settings) {
        page.setState({transferError: true});
        return;
      }
      vfSaveSettings(settings);
      page.setState({settings, displayIndex: 0, pendingIndex: null, transferError: false});
      try {
        const url = new URL(location.href);
        url.searchParams.delete('display');
        history.replaceState(history.state, '', url.href);
      } catch {
        page.setState({transferError: true});
      }
    },
    offlinePhotos: displayPool.flatMap(product => [
      vfProductImage(product, L),
      ...vfProductImages(product, L)
    ]),
    display: !st.browsing,
    displayMode: st.settings.displayMode,
    displayProduct: displayPool.length
      ? card(displayPool[st.displayIndex % displayPool.length])
      : null,
    displayCollection: st.settings.displayCollection,
    displayCategory: st.settings.displayCategory,
    setDisplayCollection: setting('displayCollection'),
    setDisplayCategory: setting('displayCategory'),
    displayCategories: kinds.map(id => ({value: id, label: VF_CATEGORY_COPY[L][id]})),
    collectionProducts: (st.collectionQuery.trim()
      ? vfSearchProducts(st.collectionQuery)
      : VF_PRODUCTS
    ).map(product => ({
      ...card(product),
      selected: st.settings.displayIds.includes(product.id),
      toggle: checked => {
        const ids = page.state.settings.displayIds;
        setting('displayIds')(
          checked ? [...new Set([...ids, product.id])] : ids.filter(id => id !== product.id)
        );
      }
    })),
    canUseShortlist: !!st.shortlist.length,
    useShortlist: () => {
      const settings = {
        ...page.state.settings,
        displayCollection: 'selected',
        displayIds: [...page.state.shortlist]
      };
      vfSaveSettings(settings);
      page.setState({settings, displayIndex: 0, pendingIndex: null});
    },
    captionMode: st.settings.captionMode,
    setCaptionMode: setting('captionMode'),
    displayLayout: st.settings.displayLayout,
    setDisplayLayout: setting('displayLayout'),
    displayProducts: vfDisplayItems(st, st.displayIndex).map(card),
    preloadProducts: page.display.preloadProducts().map(card),
    preloadVersion: st.preloadVersion,
    online: st.online,
    displayIssue: st.displayIssue,
    stockIssue: st.stockIssue,
    stockUpdated: st.stockAt
      ? new Intl.DateTimeFormat(L, {hour: '2-digit', minute: '2-digit'}).format(
          new Date(st.stockAt)
        )
      : '',
    retryDisplay: page.display.retry,
    displayLoaded: page.display.loaded,
    displayFailed: page.display.failed,
    slideSeconds: st.settings.slideSeconds,
    setSlideSeconds: value => setting('slideSeconds')(Number(value)),
    previousDisplay: () => page.display.step(-1),
    nextDisplay: () => page.display.step(1, true),
    toolsOpen: st.panel === 'tools',
    openTools: () => page.setState({panel: 'tools'}),
    browse: () =>
      page.setState({browsing: true, panel: null}, () => {
        page.browsingViewer.restartIdle();
        VF_NAV.focusById('vf-presentation-q');
      }),
    resumeDisplay: () => page.setState({browsing: false, panel: null, ...vfViewerClosed()}),
    setDisplayMode: setting('displayMode'),
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
      VF_NAV.focusById('vf-presentation-q');
    },
    showPrices: st.settings.showPrices,
    tiles: products.map((product, index) => ({
      ...card(product),
      // The visible caption names the button; describe its action separately.
      openDescription: C.open.replace('{code}', product.id),
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
    // The slideshow plays photos only, with the code and the price in the corner.
    calm: st.calm || st.slideshowRunning,
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
              label: size.name[L] + vfSeparator(L) + size.detail[L],
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
        sendIt: () =>
          page.setState({
            send: {kind: 'product', id: product.id, size: line.size, addons: line.addons},
            copied: false
          })
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
          // The clipboard is there only on a secure (https) page.
          canCopy: !!st.mounted && !!navigator.clipboard,
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
    clearShortlist: () => clearWithUndo({shortlist: []}, C.shortlistCleared),
    sendShortlist: () =>
      page.setState({
        panel: null,
        send: {kind: 'shortlist', id: ''},
        copied: false,
        handed: {...st.handed, shortlist: st.shortlist}
      }),
    // The order built at the counter.
    orderCount: st.order.reduce((sum, line) => sum + line.qty, 0),
    orderLabel: C.orderCount(st.order.reduce((sum, line) => sum + line.qty, 0)),
    orderLines: st.order.map(line => ({
      id: line.id,
      image: vfProductImage(vfFindProduct(line.productId), L),
      name: line.token,
      meta: lineSoldOut(line) ? C.soldOut + vfSeparator(L) + line[L][1] : line[L][1],
      price: S.m(line.unit * line.qty),
      quantity: line.qty,
      setQuantity: qty =>
        setOrder(page.state.order.map(item => (item.id === line.id ? {...item, qty} : item))),
      remove: () => setOrder(page.state.order.filter(item => item.id !== line.id))
    })),
    orderTotal: S.m(orderTotal),
    canHandOver: !!available.length,
    orderOpen: st.panel === 'order',
    openOrder: () => page.setState({panel: 'order'}),
    clearOrder: () => clearWithUndo({order: []}, C.orderCleared),
    // "Next customer" clears what the last one left, with an Undo.
    canStartOver: !!st.shortlist.length || !!st.order.length || !!st.q.trim() || st.cat !== 'all',
    startOver: () => clearWithUndo(VF_CUSTOMER, C.startedOver),
    handOver: () =>
      page.setState({
        panel: null,
        send: {kind: 'order', id: ''},
        copied: false,
        handed: {...st.handed, order: st.order}
      }),
    closePanel: () => {
      page.camera.stop();
      page.setState({panel: null, pinEntry: '', pinError: false, scanError: ''});
    },
    // Settings, behind the PIN when one is set.
    settingsOpen: ['settings', 'setup'].includes(st.panel),
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
    canScan: !!st.mounted && 'BarcodeDetector' in window,
    scanOpen: st.panel === 'scan',
    openScan: () => page.setState({panel: 'scan', scanError: ''}, page.camera.start),
    scanMessage:
      st.scanError === 'unknown' ? C.scanUnknown : st.scanError === 'blocked' ? C.scanBlocked : ''
  };
}
