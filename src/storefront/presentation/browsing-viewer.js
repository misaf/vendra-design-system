import {
  VF_PRODUCTS,
  VF_SIZES,
  vfFindProduct,
  vfReady,
  vfSearchProducts
} from '../catalog/catalog.js';

// Untouched this long, the slideshow starts; it then moves on at this pace.
const VF_IDLE_MS = 60_000;
const VF_SLIDE_MS = 6_000;
// Untouched this long, the full-screen view goes calm: only the photo, the code and the price stay.
const VF_CALM_MS = 4_000;
// What counts as someone using the screen, for the slideshow.
const VF_ACTIVITY = ['pointerdown', 'keydown', 'wheel'];

// The designs in the grid: the search's (or all of them), then the kind, Ready and stock filters.
export function vfShownProducts(state) {
  const found = state.q.trim() ? vfSearchProducts(state.q) : VF_PRODUCTS;
  return found
    .filter(product => state.cat === 'all' || product.cat === state.cat)
    .filter(product => !state.settings.readyOnly || vfReady(product))
    .filter(product => !state.settings.hideSoldOut || product.inStock !== false);
}
// The designs the full-screen view moves through: the grid's, the shortlist, or one scanned design.
export function vfViewerProducts(state) {
  if (state.source === 'shortlist') return state.shortlist.map(vfFindProduct).filter(Boolean);
  if (state.source === 'only') return [vfFindProduct(state.only)].filter(Boolean);
  return vfShownProducts(state);
}

// What a customer leaves on the tablet: their search, kind, shortlist and order.
export const VF_CUSTOMER = {q: '', cat: 'all', shortlist: [], order: []};
export function vfCustomerKept(state, keys = Object.keys(VF_CUSTOMER)) {
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
export function vfViewerClosed() {
  return {
    open: null,
    source: 'shown',
    pick: {size: VF_SIZES[0].id, addons: []},
    optionsOpen: false
  };
}

export function vfCreateBrowsingViewer(page) {
  let idleTimer;
  let slideTimer;
  let calmTimer;

  // The slideshow: after VF_IDLE_MS without a touch or key it opens the first design and moves on
  // every VF_SLIDE_MS. A touch stops it and leaves the design on screen, as the customer may want it.
  function restartIdle() {
    clearTimeout(idleTimer);
    clearInterval(slideTimer);
    if (page.state.slideshowRunning) page.setState({slideshowRunning: false});
    if (!page.state.browsing || !page.state.settings.slideshow) return;
    idleTimer = setTimeout(() => {
      if (page.state.panel || page.state.send) return restartIdle();
      const count = vfShownProducts(page.state).length;
      if (!count) return;
      vfForgetHandedOver(page);
      // The slideshow shows each design at its own price, whatever was last chosen on screen.
      page.setState({...vfViewerClosed(), slideshowRunning: true, open: 0});
      slideTimer = setInterval(
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
  function restartCalm() {
    clearTimeout(calmTimer);
    if (page.state.calm) page.setState({calm: false});
    calmTimer = setTimeout(() => {
      const {open, optionsOpen, send, panel} = page.state;
      if (open != null && !optionsOpen && !send && !panel) page.setState({calm: true});
    }, VF_CALM_MS);
  }

  const onActivity = () => {
    restartIdle();
    restartCalm();
  };

  return {
    mount() {
      for (const type of VF_ACTIVITY)
        document.addEventListener(type, onActivity, {capture: true, passive: true});
      restartIdle();
    },
    dispose() {
      clearTimeout(idleTimer);
      clearTimeout(calmTimer);
      clearInterval(slideTimer);
      for (const type of VF_ACTIVITY) document.removeEventListener(type, onActivity, true);
    },
    restartIdle
  };
}
