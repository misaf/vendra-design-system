// Page behavior. Edit here, then run npm --prefix templates run build.
// The counter presentation: a seller at the shop shows a walk-in customer the designs large, finds
// one by its code, a flower, a kind or the QR code on its tag, opens it full screen, builds a
// shortlist to compare and an order to hand over, and passes either to the customer's phone as a
// QR code. Unattended, it can play the designs as a slideshow.
import {vfCopy} from './copy.js';
import {ToastQueue} from '../app/ds.js';
import {
  VF_ADDONS,
  VF_LINES_PATTERN,
  VF_PRODUCTS,
  VF_SAVED_IDS_PATTERN,
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
const VF_COLLECTIONS_KEY = 'vf-presentation-collections';
const VF_PRESENTATION_SETTINGS = {
  displayMode: 'tablet',
  displayLayout: 'single',
  captionMode: 'code',
  slideSeconds: 10,
  displayCollection: 'all',
  displayCategory: 'all',
  displayIds: [],
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
// Untouched this long, the full-screen view goes calm: only the photo, the code and the price stay.
const VF_CALM_MS = 4_000;
// How often an open presentation asks the API what is in stock.
const VF_STOCK_MS = 120_000;
// How long "Cleared · Undo" stays.
const VF_UNDO_MS = 8_000;
// What counts as someone using the screen, for the slideshow.
const VF_ACTIVITY = ['pointerdown', 'keydown', 'wheel'];

function vfNormalizeSettings(saved = {}) {
  try {
    const settings = Object.fromEntries(
      Object.entries(VF_PRESENTATION_SETTINGS).map(([key, value]) => [
        key,
        typeof saved[key] === typeof value &&
        (key !== 'displayMode' || ['tablet', 'tv'].includes(saved[key])) &&
        (key !== 'displayLayout' || ['single', 'pair'].includes(saved[key])) &&
        (key !== 'captionMode' || ['photo', 'code', 'price'].includes(saved[key])) &&
        (key !== 'slideSeconds' || [6, 10, 15].includes(saved[key])) &&
        (key !== 'displayCollection' || ['all', 'category', 'selected'].includes(saved[key])) &&
        (key !== 'displayIds' || Array.isArray(saved[key]))
          ? saved[key]
          : value
      ])
    );
    settings.displayIds = [...new Set(settings.displayIds)].filter(id =>
      VF_PRODUCTS.some(product => product.id === id)
    );
    if (!['all', ...VF_PRODUCTS.map(product => product.cat)].includes(settings.displayCategory))
      settings.displayCategory = 'all';
    return settings;
  } catch {
    return {...VF_PRESENTATION_SETTINGS};
  }
}
function vfReadSettings() {
  try {
    return vfNormalizeSettings(JSON.parse(localStorage.getItem(VF_PRESENTATION_KEY) || '{}'));
  } catch {
    return vfNormalizeSettings();
  }
}
function vfPortableSettings(settings) {
  const normalized = vfNormalizeSettings(settings);
  return Object.fromEntries(Object.entries(normalized).filter(([key]) => key !== 'pin'));
}
function vfReadCollections() {
  try {
    const stored = JSON.parse(localStorage.getItem(VF_COLLECTIONS_KEY) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored
      .slice(0, 20)
      .filter(value => value && typeof value.name === 'string' && value.name.trim())
      .map(value => ({
        name: value.name.trim().slice(0, 60),
        settings: vfPortableSettings(value.settings)
      }));
  } catch {
    return [];
  }
}
function vfStoreCollections(collections) {
  try {
    localStorage.setItem(VF_COLLECTIONS_KEY, JSON.stringify(collections));
  } catch {}
}
function vfSharedSetup() {
  try {
    return new URL(location.href).searchParams.get('display')?.slice(0, 12000) || '';
  } catch {
    return '';
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

// A device's display collection is independent of the current customer's search and shortlist.
function vfDisplayProducts(state) {
  const settings = state.settings;
  const products =
    settings.displayCollection === 'selected'
      ? settings.displayIds.map(vfFindProduct).filter(Boolean)
      : VF_PRODUCTS;
  return products
    .filter(
      product =>
        settings.displayCollection !== 'category' ||
        settings.displayCategory === 'all' ||
        product.cat === settings.displayCategory
    )
    .filter(product => !settings.readyOnly || vfReady(product))
    .filter(
      product =>
        product.inStock !== false || (!settings.hideSoldOut && settings.captionMode !== 'photo')
    );
}

// Display playback is separate from the seller's full-screen quote viewer.
function vfDisplayPair(state) {
  return state.settings.displayLayout === 'pair' && state.displayLandscape;
}
function vfDisplayItems(state, index) {
  const products = vfDisplayProducts(state);
  return products.length
    ? Array.from(
        {length: vfDisplayPair(state) && products.length > 1 ? 2 : 1},
        (_, offset) => products[(index + offset) % products.length]
      )
    : [];
}
function vfDisplayImageKey(product, lang) {
  const image = vfProductImage(product, lang);
  return JSON.stringify([product.id, image.src, image.srcSet, image.sources]);
}
function vfDisplayCommit(page) {
  const {pendingIndex} = page.state;
  if (pendingIndex == null) return;
  const items = vfDisplayItems(page.state, pendingIndex);
  if (
    !items.length ||
    !items.every(product => page._displayReady.has(vfDisplayImageKey(product, page.props.lang)))
  )
    return;
  clearTimeout(page._displayWait);
  page.setState({
    displayIndex: pendingIndex,
    pendingIndex: null,
    displayIssue: !!page.state.failedImageKeys.length
  });
  // Give the newly decoded product its full dwell, including after manual navigation.
  page._displayTimerKey = null;
  vfSyncDisplay(page);
}
function vfDisplayFailure(page, key) {
  page._displayReady.delete(key);
  const failures = (page._displayFailures.get(key)?.attempts || 0) + 1;
  page._displayFailures.set(key, {
    attempts: failures,
    retryAt: Date.now() + Math.min(300000, 30000 * 2 ** Math.min(failures - 1, 4))
  });
  const failedImageKeys = [...new Set([...page.state.failedImageKeys, key])];
  const pending =
    page.state.pendingIndex != null &&
    vfDisplayItems(page.state, page.state.pendingIndex).some(
      product => vfDisplayImageKey(product, page.props.lang) === key
    );
  if (pending) clearTimeout(page._displayWait);
  page.setState({failedImageKeys, displayIssue: true, ...(pending ? {pendingIndex: null} : {})});
}
function vfDisplayStep(page, delta, automatic = false) {
  const count = vfDisplayProducts(page.state).length;
  if (!count || (automatic && page.state.pendingIndex != null)) return;
  clearTimeout(page._displayWait);
  // A new gesture replaces a slow request. Never let one bad photo block the whole collection.
  const stride = vfDisplayPair(page.state) ? 2 : 1;
  let index = null;
  for (let offset = 0; offset < count; offset++) {
    const candidate = (page.state.displayIndex + delta * (stride + offset) + count * 3) % count;
    if (
      vfDisplayItems(page.state, candidate).every(
        product =>
          (page._displayFailures.get(vfDisplayImageKey(product, page.props.lang))?.retryAt || 0) <=
          Date.now()
      )
    ) {
      index = candidate;
      break;
    }
  }
  if (index == null) {
    page.setState({pendingIndex: null});
    return;
  }
  page.setState({pendingIndex: index, preloadVersion: page.state.preloadVersion + 1});
  vfDisplayCommit(page);
  if (page.state.pendingIndex != null)
    page._displayWait = setTimeout(() => {
      for (const product of vfDisplayItems(page.state, index)) {
        const key = vfDisplayImageKey(product, page.props.lang);
        if (!page._displayReady.has(key)) vfDisplayFailure(page, key);
      }
    }, 15000);
}
function vfSyncDisplay(page) {
  // Cancel a pending replacement if the seller changes the pool, layout, or opens another task.
  const context = JSON.stringify([
    page.state.browsing,
    page.state.panel,
    page.state.send?.kind,
    page.state.settings.displayMode,
    page.state.settings.displayLayout,
    page.state.displayLandscape,
    vfDisplayProducts(page.state).map(product => product.id)
  ]);
  if (page._displayContext !== context) {
    page._displayContext = context;
    clearTimeout(page._displayWait);
    if (page.state.pendingIndex != null) page.setState({pendingIndex: null});
  }
  const playing =
    !page._unmounted &&
    !page.state.browsing &&
    page.state.settings.displayMode === 'tv' &&
    !page.state.panel &&
    !page.state.send &&
    document.visibilityState !== 'hidden';
  const timerKey = JSON.stringify([playing, page.state.settings.slideSeconds]);
  if (page._displayTimerKey === timerKey) return;
  page._displayTimerKey = timerKey;
  clearInterval(page._displayTimer);
  if (playing)
    page._displayTimer = setInterval(
      () => vfDisplayStep(page, 1, true),
      page.state.settings.slideSeconds * 1000
    );
}

// What a customer leaves on the tablet: their search, kind, shortlist and order.
const VF_CUSTOMER = {q: '', cat: 'all', shortlist: [], order: []};
function vfCustomerKept(state, keys = Object.keys(VF_CUSTOMER)) {
  return Object.fromEntries(keys.map(key => [key, state[key]]));
}
// When the slideshow starts, the customer has gone: what was handed over to their phone (and not
// changed since) leaves the tablet, with the search. An order or shortlist not handed over stays,
// as the seller may only have stepped away.
function vfForgetHandedOver(page) {
  const {handed, shortlist, order} = page.state;
  const patch = {};
  if (shortlist.length && handed.shortlist === shortlist) patch.shortlist = [];
  if (order.length && handed.order === order) patch.order = [];
  if (!Object.keys(patch).length) return;
  page.setState({...patch, q: '', cat: 'all', handed: {shortlist: null, order: null}});
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

// The slideshow: after VF_IDLE_MS without a touch or key it opens the first design and moves on
// every VF_SLIDE_MS. A touch stops it and leaves the design on screen, as the customer may want it.
function vfRestartIdle(page) {
  clearTimeout(page._idleTimer);
  clearInterval(page._slideTimer);
  if (page.state.slideshowRunning) page.setState({slideshowRunning: false});
  if (!page.state.browsing || !page.state.settings.slideshow) return;
  page._idleTimer = setTimeout(() => {
    if (page.state.panel || page.state.send) return vfRestartIdle(page);
    const count = vfShownProducts(page.state).length;
    if (!count) return;
    vfForgetHandedOver(page);
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

// A touch or a key brings the full-screen view's controls back; untouched for VF_CALM_MS, they go
// again (not while the seller is choosing a size or extras, or a dialog is open over it).
function vfRestartCalm(page) {
  clearTimeout(page._calmTimer);
  if (page.state.calm) page.setState({calm: false});
  page._calmTimer = setTimeout(() => {
    const {open, optionsOpen, send, panel} = page.state;
    if (open != null && !optionsOpen && !send && !panel) page.setState({calm: true});
  }, VF_CALM_MS);
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

export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      q: '',
      cat: 'all',
      setupDone: (() => {
        try {
          return !!localStorage.getItem('vf-display-setup-done');
        } catch {
          return false;
        }
      })(),
      collections: vfReadCollections(),
      collectionName: '',
      activeCollection: '',
      collectionQuery: '',
      transferText: vfSharedSetup(),
      transferError: false,
      setupFullscreen: false,
      wakeStatus: 'unsupported',
      browsing: false,
      displayIndex: 0,
      pendingIndex: null,
      preloadVersion: 0,
      displayIssue: false,
      failedImageKeys: [],
      online: typeof navigator === 'undefined' || navigator.onLine !== false,
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
    page._displayReady = new Set();
    page._displayFailures = new Map();
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
      page._displayMedia = window.matchMedia('(min-width: 768px) and (min-aspect-ratio: 4/3)');
      page._onDisplayMedia = () => page.setState({displayLandscape: page._displayMedia.matches});
      page._displayMedia.addEventListener('change', page._onDisplayMedia);
      page._onDisplayMedia();
      page._onConnection = () => {
        const online = navigator.onLine !== false;
        page.setState({online, ...(online ? {preloadVersion: page.state.preloadVersion + 1} : {})});
        if (online && window.VF_API.live) vfRefreshStock(page);
      };
      window.addEventListener('online', page._onConnection);
      window.addEventListener('offline', page._onConnection);
      page._onVisibility = () => {
        vfSyncWakeLock(page);
        vfSyncDisplay(page);
      };
      page._onFullscreen = () => page.setState({fullscreen: !!document.fullscreenElement});
      // "/" jumps to the search, unless the seller is typing or a dialog is open.
      page._onKey = event => {
        const target = /** @type {HTMLElement} */ (event.target);
        if (event.defaultPrevented) return;
        if (page.state.settings.displayMode === 'tv' && page.state.panel) {
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
            vfDisplayStep(page, next ? 1 : -1);
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
      page._onActivity = () => {
        vfRestartIdle(page);
        vfRestartCalm(page);
      };
      document.addEventListener('visibilitychange', page._onVisibility);
      document.addEventListener('fullscreenchange', page._onFullscreen);
      document.addEventListener('keydown', page._onKey);
      for (const type of VF_ACTIVITY)
        document.addEventListener(type, page._onActivity, {capture: true, passive: true});
      vfSyncWakeLock(page);
      vfRestartIdle(page);
      vfSyncDisplay(page);
      if (window.VF_API.live) {
        vfRefreshStock(page);
        page._stockTimer = setInterval(() => vfRefreshStock(page), VF_STOCK_MS);
      }
    },
    didUpdate() {
      vfSyncDisplay(page);
    },
    willUnmount() {
      page._unmounted = true;
      window.removeEventListener('online', page._onConnection);
      window.removeEventListener('offline', page._onConnection);
      page._displayMedia.removeEventListener('change', page._onDisplayMedia);
      clearTimeout(page._searchTimer);
      clearTimeout(page._copiedTimer);
      clearTimeout(page._addedTimer);
      clearTimeout(page._idleTimer);
      clearTimeout(page._calmTimer);
      clearInterval(page._slideTimer);
      clearInterval(page._stockTimer);
      clearInterval(page._displayTimer);
      clearTimeout(page._displayWait);
      vfStopCamera(page);
      document.removeEventListener('visibilitychange', page._onVisibility);
      document.removeEventListener('fullscreenchange', page._onFullscreen);
      document.removeEventListener('keydown', page._onKey);
      for (const type of VF_ACTIVITY) document.removeEventListener(type, page._onActivity, true);
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
    if (key === 'slideshow') vfRestartIdle(page);
    vfSyncDisplay(page);
  };
  const absolute = href => new URL(href, location.href).href;
  const prefix = page.props.go ? '' : '../app/';
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
  // Clearing the shortlist or the order closes its dialog and can be undone for a few seconds, as one
  // tap clears it.
  const clearWithUndo = (patch, title) => {
    const kept = vfCustomerKept(page.state, Object.keys(patch));
    page.setState({...patch, ...vfViewerClosed(), panel: null});
    page.toasts.clear();
    page.toasts.add(
      {
        title,
        action: {
          label: C.undo,
          onClick: () => {
            page.setState(kept);
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
        url: absolute(
          prefix +
            vfRouteParams({
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
        url: absolute(
          prefix + vfRouteParams({lang: L, view: 'saved', ids: st.shortlist.join(',')})
        ),
        // Longer than a link may carry, the customer's phone would open an empty list.
        tooLong: !VF_SAVED_IDS_PATTERN.test(st.shortlist.join(',')),
        tooLongBody: C.shortlistTooLong
      };
    return {
      title: C.orderTitle,
      body: C.handOverBody,
      qrLabel: C.qr.replace('{code}', C.order),
      code: '',
      url: absolute(prefix + vfRouteParams({lang: L, view: 'bag', lines: vfLinesParam(available)})),
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
    canWake: typeof navigator !== 'undefined' && 'wakeLock' in navigator,
    collectionName: st.collectionName,
    setCollectionName: value => page.setState({collectionName: value.slice(0, 60)}),
    savedCollections: st.collections.map(item => ({value: item.name, label: item.name})),
    activeCollection: st.activeCollection,
    loadCollection: name => {
      const saved = page.state.collections.find(item => item.name === name);
      if (!saved) return;
      const settings = {...vfNormalizeSettings(saved.settings), pin: page.state.settings.pin};
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
      (st.collections.length < 20 ||
        st.collections.some(item => item.name === st.collectionName.trim())),
    saveCollection: () => {
      const name = page.state.collectionName.trim();
      if (!name || !vfDisplayProducts(page.state).length) return;
      const current = page.state.collections;
      if (current.length >= 20 && !current.some(item => item.name === name)) return;
      const collections = [
        ...current.filter(item => item.name !== name),
        {name, settings: vfPortableSettings(page.state.settings)}
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
      page.setState({transferText: value.slice(0, 12000), transferError: false}),
    exportSetup: () =>
      page.setState({
        transferText: JSON.stringify({
          version: 1,
          settings: vfPortableSettings(page.state.settings)
        })
      }),
    setupLink: (() => {
      const url = new URL(
        typeof location !== 'undefined' ? location.href : 'http://localhost/templates/app/'
      );
      url.search = new URLSearchParams({
        view: 'presentation',
        lang: L,
        display: JSON.stringify({version: 1, settings: vfPortableSettings(st.settings)})
      }).toString();
      url.hash = '';
      return url.href;
    })(),
    importSetup: () => {
      try {
        const text = page.state.transferText.trim();
        const value = JSON.parse(
          text.startsWith('{') ? text : new URL(text).searchParams.get('display')
        );
        if (
          value?.version !== 1 ||
          !value.settings ||
          typeof value.settings !== 'object' ||
          Array.isArray(value.settings)
        )
          throw new Error('setup');
        const settings = {...vfNormalizeSettings(value.settings), pin: page.state.settings.pin};
        vfSaveSettings(settings);
        page.setState({settings, displayIndex: 0, pendingIndex: null, transferError: false});
        const url = new URL(location.href);
        url.searchParams.delete('display');
        history.replaceState(history.state, '', url.href);
      } catch {
        page.setState({transferError: true});
      }
    },
    offlineUrls: displayPool.flatMap(product =>
      vfProductImages(product, L).map(image => image.src)
    ),
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
    preloadProducts: vfDisplayItems(
      st,
      st.pendingIndex ?? st.displayIndex + (vfDisplayPair(st) ? 2 : 1)
    ).map(card),
    preloadVersion: st.preloadVersion,
    online: st.online,
    displayIssue: st.displayIssue,
    stockIssue: st.stockIssue,
    stockUpdated: st.stockAt
      ? new Intl.DateTimeFormat(L, {hour: '2-digit', minute: '2-digit'}).format(
          new Date(st.stockAt)
        )
      : '',
    retryDisplay: () => {
      page._displayFailures.clear();
      page.setState({
        failedImageKeys: [],
        displayIssue: false,
        preloadVersion: page.state.preloadVersion + 1
      });
    },
    displayLoaded: key => {
      if (page._unmounted) return;
      page._displayReady.add(key);
      page._displayFailures.delete(key);
      if (page.state.failedImageKeys.includes(key)) {
        const failedImageKeys = page.state.failedImageKeys.filter(value => value !== key);
        page.setState({failedImageKeys, displayIssue: !!failedImageKeys.length});
      }
      vfDisplayCommit(page);
    },
    displayFailed: key => {
      if (page._unmounted) return;
      vfDisplayFailure(page, key);
    },
    slideSeconds: st.settings.slideSeconds,
    setSlideSeconds: value => setting('slideSeconds')(Number(value)),
    previousDisplay: () => vfDisplayStep(page, -1),
    nextDisplay: () => vfDisplayStep(page, 1, true),
    toolsOpen: st.panel === 'tools',
    openTools: () => page.setState({panel: 'tools'}),
    browse: () =>
      page.setState({browsing: true, panel: null}, () => {
        vfRestartIdle(page);
        S.focus('vf-presentation-q');
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
          canCopy: typeof navigator !== 'undefined' && !!navigator.clipboard,
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
      meta: lineSoldOut(line) ? C.soldOut + ' · ' + line[L][1] : line[L][1],
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
      vfStopCamera(page);
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
    canScan: typeof window !== 'undefined' && 'BarcodeDetector' in window,
    scanOpen: st.panel === 'scan',
    openScan: () => page.setState({panel: 'scan', scanError: ''}, () => vfStartCamera(page)),
    scanMessage:
      st.scanError === 'unknown' ? C.scanUnknown : st.scanError === 'blocked' ? C.scanBlocked : ''
  };
}
