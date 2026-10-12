// The storefront pages, each its own chunk: a page's code loads when it is first shown, and the
// click-through site fetches the rest once the browser is idle so moving between pages stays instant.
import React from 'react';

const modules = import.meta.glob('../storefront-*/Page.jsx');
const loaded = {};

// Loads a page module (storefront-<name>/Page.jsx), once.
export function loadPage(name) {
  const key = '../storefront-' + name + '/Page.jsx';
  if (!modules[key]) return null;
  return (loaded[name] ||= modules[key]());
}

// A page as a lazy component; render it inside <Suspense>.
export function lazyPage(name) {
  return React.lazy(() => loadPage(name));
}

// Fetches every page in the background.
export function preloadPages() {
  const run = () => Object.keys(modules).forEach(key => loadPage(key.split('/')[1].slice(11)));
  if ('requestIdleCallback' in window) requestIdleCallback(run);
  else setTimeout(run, 200);
}
