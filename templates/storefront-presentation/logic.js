// Page behavior. Edit here, then run npm --prefix templates run build.
// The counter presentation: a seller at the shop shows a walk-in customer the designs large, finds
// one by its code (or a flower or kind), opens it full screen and hands it over with a QR code.
import {vfCopy} from './copy.js';
import {
  VF_PRODUCTS,
  vfFindProduct,
  vfProductImage,
  vfProductImages,
  vfProductSub,
  vfReady,
  vfSearchProducts
} from '../_shared/catalog.js';
import {vfShell} from '../_shared/navigation.js';
import {VF_CATEGORY_COPY} from '../_shared/translations/categories.js';
import {useLifecycle, usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';

// The counter settings, kept on this device (the shop's tablet).
const VF_PRESENTATION_KEY = 'vf-presentation';
const VF_PRESENTATION_SETTINGS = {showPrices: true, readyOnly: false, keepAwake: true};
// A search is reported once the typing settles, as on the search page.
const VF_SEARCH_SETTLE_MS = 1000;

function vfReadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(VF_PRESENTATION_KEY) || '{}') || {};
    return Object.fromEntries(
      Object.entries(VF_PRESENTATION_SETTINGS).map(([key, value]) => [
        key,
        typeof saved[key] === 'boolean' ? saved[key] : value
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

// The designs on screen: the search's (or all of them), then the kind and Ready filters.
function vfShownProducts(state) {
  const found = state.q.trim() ? vfSearchProducts(state.q) : VF_PRODUCTS;
  return found
    .filter(product => state.cat === 'all' || product.cat === state.cat)
    .filter(product => !state.settings.readyOnly || vfReady(product));
}

// Holds the screen awake while the setting is on and the page is visible (the browser lets go of
// the lock whenever the page is hidden, so it is asked for again on return).
async function vfSyncWakeLock(page) {
  const wanted = page.state.settings.keepAwake && document.visibilityState === 'visible';
  if (!wanted) {
    if (page._wakeLock) page._wakeLock.release().catch(() => {});
    page._wakeLock = null;
    return;
  }
  if (page._wakeLock || !('wakeLock' in navigator)) return;
  try {
    page._wakeLock = await navigator.wakeLock.request('screen');
    page._wakeLock.addEventListener('release', () => (page._wakeLock = null));
  } catch {
    page._wakeLock = null;
  }
}

export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      q: '',
      cat: 'all',
      settings: vfReadSettings(),
      open: null,
      sendFor: '',
      copied: false,
      settingsOpen: false,
      fullscreen: false
    };
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
      document.addEventListener('visibilitychange', page._onVisibility);
      document.addEventListener('fullscreenchange', page._onFullscreen);
      document.addEventListener('keydown', page._onKey);
      vfSyncWakeLock(page);
    },
    willUnmount() {
      clearTimeout(page._searchTimer);
      clearTimeout(page._copiedTimer);
      document.removeEventListener('visibilitychange', page._onVisibility);
      document.removeEventListener('fullscreenchange', page._onFullscreen);
      document.removeEventListener('keydown', page._onKey);
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
  const setting = key => value => {
    const settings = {...page.state.settings, [key]: value};
    vfSaveSettings(settings);
    page.setState({settings, open: null});
    if (key === 'keepAwake') vfSyncWakeLock(page);
  };
  const sendProduct = st.sendFor ? vfFindProduct(st.sendFor) : null;
  // The product page's full address, for the customer's phone.
  const sendUrl = sendProduct
    ? new URL(S.productLink(sendProduct.id).href, location.href).href
    : '';
  const kinds = ['all', ...new Set(VF_PRODUCTS.map(product => product.cat))];
  return {
    ...S,
    t: {...S.t, ...C},
    q: st.q,
    setQ: value => {
      page.setState({q: value, open: null});
      page._report(value);
    },
    // Enter opens the design straight away when the search found exactly one.
    submitQ: () => {
      if (products.length === 1) page.setState({open: 0});
    },
    kinds: kinds.map(cat => ({
      id: cat,
      label: VF_CATEGORY_COPY[L][cat],
      selected: st.cat === cat,
      pick: () => page.setState({cat, open: null})
    })),
    countLabel: C.count(products.length),
    noResults: !products.length,
    showAll: () => {
      page.setState({q: '', cat: 'all'});
      if (page.state.settings.readyOnly) setting('readyOnly')(false);
      S.focus('vf-presentation-q');
    },
    showPrices: st.settings.showPrices,
    tiles: products.map((product, index) => ({
      id: product.id,
      code: product.id,
      kind: vfProductSub(product, L),
      price: S.m(product.price),
      image: vfProductImage(product, L),
      ready: vfReady(product),
      soldOut: product.inStock === false,
      openLabel: C.open.replace('{code}', product.id),
      open: () => page.setState({open: index})
    })),
    open: st.open,
    setOpen: index => page.setState({open: index}),
    closeViewer: () => page.setState({open: null}),
    viewer: products.map(product => ({
      id: product.id,
      images: vfProductImages(product, L),
      code: product.id,
      kind: vfProductSub(product, L),
      price: S.m(product.price),
      soldOut: product.inStock === false
    })),
    sendTo: id => page.setState({sendFor: id, copied: false}),
    send: sendProduct
      ? {
          code: sendProduct.id,
          title: C.sendTitle.replace('{code}', sendProduct.id),
          qrLabel: C.qr.replace('{code}', sendProduct.id),
          url: sendUrl,
          whatsapp: 'https://wa.me/?text=' + encodeURIComponent(sendProduct.id + '\n' + sendUrl),
          copied: st.copied,
          copy: () =>
            navigator.clipboard?.writeText(sendUrl).then(
              () => {
                page.setState({copied: true});
                clearTimeout(page._copiedTimer);
                page._copiedTimer = setTimeout(() => page.setState({copied: false}), 2000);
              },
              () => {}
            )
        }
      : null,
    closeSend: () => page.setState({sendFor: ''}),
    settingsOpen: st.settingsOpen,
    openSettings: () => page.setState({settingsOpen: true}),
    closeSettings: () => page.setState({settingsOpen: false}),
    settings: st.settings,
    setShowPrices: setting('showPrices'),
    setReadyOnly: setting('readyOnly'),
    setKeepAwake: setting('keepAwake'),
    canFullscreen: typeof document !== 'undefined' && !!document.fullscreenEnabled,
    fullscreen: st.fullscreen,
    setFullscreen: on => {
      const request = on
        ? document.documentElement.requestFullscreen()
        : document.fullscreenElement
          ? document.exitFullscreen()
          : null;
      if (request) request.catch(() => {});
    }
  };
}
