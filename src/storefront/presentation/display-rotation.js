import {VF_PRODUCTS, vfFindProduct, vfProductImage, vfReady} from '../catalog/catalog.js';

// A device's display collection is independent of the current customer's search and shortlist.
export function vfDisplayProducts(state) {
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
export function vfDisplayItems(state, index) {
  const products = vfDisplayProducts(state);
  return products.length
    ? Array.from(
        {length: vfDisplayPair(state) && products.length > 1 ? 2 : 1},
        (_, offset) => products[(index + offset) % products.length]
      )
    : [];
}
export function vfDisplayImageKey(product, lang) {
  const image = vfProductImage(product, lang);
  return JSON.stringify([product.id, image.src, image.srcSet, image.sources]);
}
// Owns the TV rotation, decoded images, and the pending replacement deadline.
export function vfCreateDisplay(page) {
  const ready = new Set();
  const failures = new Map();
  let waitTimer;
  let rotationTimer;
  let contextKey;
  let timerKey;
  let media;

  const onMedia = () => page.setState({displayLandscape: media.matches});

  function mount() {
    media = window.matchMedia('(min-width: 768px) and (min-aspect-ratio: 4/3)');
    media.addEventListener('change', onMedia);
    onMedia();
  }

  function dispose() {
    media.removeEventListener('change', onMedia);
    clearInterval(rotationTimer);
    clearTimeout(waitTimer);
    contextKey = timerKey = undefined;
  }

  function commit() {
    const {pendingIndex} = page.state;
    if (pendingIndex == null) return;
    const items = vfDisplayItems(page.state, pendingIndex);
    if (
      !items.length ||
      !items.every(product => ready.has(vfDisplayImageKey(product, page.props.lang)))
    )
      return;
    clearTimeout(waitTimer);
    page.setState({
      displayIndex: pendingIndex,
      pendingIndex: null,
      displayIssue: !!page.state.failedImageKeys.length
    });
    // Give the newly decoded product its full dwell, including after manual navigation.
    timerKey = null;
    sync();
  }
  function failed(key) {
    if (page._unmounted) return;
    ready.delete(key);
    const attempts = (failures.get(key)?.attempts || 0) + 1;
    failures.set(key, {
      attempts,
      retryAt: Date.now() + Math.min(300000, 30000 * 2 ** Math.min(attempts - 1, 4))
    });
    const failedImageKeys = [...new Set([...page.state.failedImageKeys, key])];
    const pending =
      page.state.pendingIndex != null &&
      vfDisplayItems(page.state, page.state.pendingIndex).some(
        product => vfDisplayImageKey(product, page.props.lang) === key
      );
    if (pending) clearTimeout(waitTimer);
    page.setState({failedImageKeys, displayIssue: true, ...(pending ? {pendingIndex: null} : {})});
  }
  function step(delta, automatic = false) {
    const count = vfDisplayProducts(page.state).length;
    if (!count || (automatic && page.state.pendingIndex != null)) return;
    clearTimeout(waitTimer);
    // A new gesture replaces a slow request. Never let one bad photo block the whole collection.
    const stride = vfDisplayPair(page.state) ? 2 : 1;
    let index = null;
    for (let offset = 0; offset < count; offset++) {
      const candidate = (page.state.displayIndex + delta * (stride + offset) + count * 3) % count;
      if (
        vfDisplayItems(page.state, candidate).every(
          product =>
            (failures.get(vfDisplayImageKey(product, page.props.lang))?.retryAt || 0) <= Date.now()
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
    commit();
    if (page.state.pendingIndex != null)
      waitTimer = setTimeout(() => {
        if (page.state.pendingIndex !== index) return;
        for (const product of vfDisplayItems(page.state, index)) {
          const key = vfDisplayImageKey(product, page.props.lang);
          if (!ready.has(key)) failed(key);
        }
      }, 15000);
  }
  function sync() {
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
    if (contextKey !== context) {
      contextKey = context;
      clearTimeout(waitTimer);
      if (page.state.pendingIndex != null) page.setState({pendingIndex: null});
    }
    const playing =
      !page._unmounted &&
      !page.state.browsing &&
      page.state.settings.displayMode === 'tv' &&
      !page.state.panel &&
      !page.state.send &&
      document.visibilityState !== 'hidden';
    const nextTimerKey = JSON.stringify([playing, page.state.settings.slideSeconds]);
    if (timerKey === nextTimerKey) return;
    timerKey = nextTimerKey;
    clearInterval(rotationTimer);
    if (playing)
      rotationTimer = setInterval(() => step(1, true), page.state.settings.slideSeconds * 1000);
  }

  function retry() {
    failures.clear();
    page.setState({
      failedImageKeys: [],
      displayIssue: false,
      preloadVersion: page.state.preloadVersion + 1
    });
  }
  function loaded(key) {
    if (page._unmounted) return;
    ready.add(key);
    failures.delete(key);
    if (page.state.failedImageKeys.includes(key)) {
      const failedImageKeys = page.state.failedImageKeys.filter(value => value !== key);
      page.setState({failedImageKeys, displayIssue: !!failedImageKeys.length});
    }
    commit();
  }

  function preloadProducts() {
    const st = page.state;
    return vfDisplayItems(
      st,
      st.pendingIndex ?? st.displayIndex + (vfDisplayPair(st) ? 2 : 1)
    ).filter(
      product =>
        st.pendingIndex != null ||
        (failures.get(vfDisplayImageKey(product, page.props.lang))?.retryAt || 0) <= Date.now()
    );
  }

  return {mount, dispose, sync, step, preloadProducts, retry, loaded, failed};
}
