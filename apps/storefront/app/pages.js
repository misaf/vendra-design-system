// The storefront pages, each its own chunk: a page's code loads when it is first shown, and the
// click-through site fetches the rest once the browser is idle so moving between pages stays instant.
import React from 'react';

const modules = {
  account: () => import('../pages/account/Page.jsx'),
  bag: () => import('../pages/bag/Page.jsx'),
  checkout: () => import('../pages/checkout/Page.jsx'),
  contact: () => import('../pages/contact/Page.jsx'),
  error: () => import('../pages/error/Page.jsx'),
  faq: () => import('../pages/faq/Page.jsx'),
  home: () => import('../pages/home/Page.jsx'),
  journal: () => import('../pages/journal/Page.jsx'),
  notfound: () => import('../pages/notfound/Page.jsx'),
  policy: () => import('../pages/policy/Page.jsx'),
  post: () => import('../pages/post/Page.jsx'),
  presentation: () => import('../pages/presentation/Page.jsx'),
  product: () => import('../pages/product/Page.jsx'),
  saved: () => import('../pages/saved/Page.jsx'),
  search: () => import('../pages/search/Page.jsx'),
  shop: () => import('../pages/shop/Page.jsx'),
  signin: () => import('../pages/signin/Page.jsx'),
  track: () => import('../pages/track/Page.jsx'),
  weddings: () => import('../pages/weddings/Page.jsx')
};
const loaded = {};
const ready = new Set();
// Each loaded page module by name, so a page whose code is in renders without suspending.
const modulesByName = {};
// Pages being loaded to show them now (not background preloads).
const showing = new Set();

// Loads a page module (pages/<name>/Page.jsx), once; a failed load is forgotten so the next
// attempt fetches it again. `show` says the page is wanted on screen now: if its files were replaced
// by a deploy, the tab reloads to get the new ones.
export function loadPage(name, show = true) {
  if (!Object.hasOwn(modules, name)) return null;
  if (show && !ready.has(name)) showing.add(name);
  const load = (loaded[name] ||= modules[name]().then(async module => {
    // @ts-expect-error Next.js substitutes this build-time constant.
    if (process.env.NEXT_PUBLIC_VF_BROWSER_TEST === '1' && typeof window !== 'undefined') {
      await /** @type {any} */ (window).__vfPageEvaluation?.(name);
    }
    if (!module) throw new Error('The ' + name + ' page did not load.');
    modulesByName[name] = module;
    ready.add(name);
    return module;
  }));
  load.then(
    () => showing.delete(name),
    error => {
      if (showing.delete(name) && /ChunkLoadError|Failed to load chunk/i.test(String(error)))
        reloadIfDeployed(error);
      if (loaded[name] === load) delete loaded[name];
    }
  );
  return load;
}

// A missing hashed chunk after a new deployment can be recovered by reloading its document.
async function reloadIfDeployed(error) {
  const url = /(?:https?:\/\/[^/\s)]+)?(?:\/[\w.-]+)*\/_next\/static\/[^\s)]+\.js/.exec(
    String(error)
  )?.[0];
  if (!url) return;
  try {
    if (new URL(url, location.href).origin !== location.origin) return;
    const key = 'vf-reloaded-at';
    const last = Number(sessionStorage.getItem(key)) || 0;
    if (Date.now() - last < 60000) return;
    const response = await fetch(url, {method: 'HEAD', cache: 'no-store'});
    if (response.status !== 404) return;
    sessionStorage.setItem(key, String(Date.now()));
    location.reload();
  } catch {}
}

// Whether a page's code has loaded (it then renders at once, without suspending).
export function pageReady(name) {
  return ready.has(name);
}

// A page as a lazy component; render it inside <Suspense> and a PageBoundary. A page whose code is
// already in renders at once: the build's prerender and the browser's hydration (the Next.js boot code loads
// the address's page first) then render the same markup, without suspending.
export function lazyPage(name) {
  const Lazy = React.lazy(() => loadPage(name));
  return function LazyPage(props) {
    const [Page] = React.useState(() => modulesByName[name]?.default || Lazy);
    return React.createElement(Page, props);
  };
}

// Prefetch after the first route is usable, one page per idle turn to avoid blocking input.
export function preloadPages() {
  const queue = Object.keys(modules).values();
  let active = true;
  performance.mark('vf-preload-pages');

  function run() {
    if (!active) return;
    const {value, done} = queue.next();
    if (done) return;
    loadPage(value, false)?.then(schedule, schedule);
  }
  function schedule() {
    if (!active) return;
    if ('requestIdleCallback' in window) requestIdleCallback(run);
    else setTimeout(run, 200);
  }
  schedule();
  return () => {
    active = false;
  };
}
