// The storefront pages, each its own chunk: a page's code loads when it is first shown, and the
// click-through site fetches the rest once the browser is idle so moving between pages stays instant.
import React from 'react';

const modules = import.meta.glob('../storefront-*/Page.jsx');
const loaded = {};
const ready = new Set();

// Loads a page module (storefront-<name>/Page.jsx), once; a failed load is forgotten so the next
// attempt fetches it again.
export function loadPage(name) {
  const key = '../storefront-' + name + '/Page.jsx';
  if (!modules[key]) return null;
  return (loaded[name] ||= modules[key]().then(
    module => {
      ready.add(name);
      return module;
    },
    error => {
      delete loaded[name];
      throw error;
    }
  ));
}

// Whether a page's code has loaded (it then renders at once, without suspending).
export function pageReady(name) {
  return ready.has(name);
}

// A page as a lazy component; render it inside <Suspense> and a PageBoundary.
export function lazyPage(name) {
  return React.lazy(() => loadPage(name));
}

// Fetches every page in the background (a failure here is retried when the page is shown).
export function preloadPages() {
  const run = () =>
    Object.keys(modules).forEach(key => loadPage(key.split('/')[1].slice(11))?.catch(() => {}));
  if ('requestIdleCallback' in window) requestIdleCallback(run);
  else setTimeout(run, 200);
}
