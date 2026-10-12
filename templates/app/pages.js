// The storefront pages, each its own chunk: a page's code loads when it is first shown, and the
// click-through site fetches the rest once the browser is idle so moving between pages stays instant.
import React from 'react';

const modules = import.meta.glob('../storefront-*/Page.jsx');
const loaded = {};
const ready = new Set();
// Pages being loaded to show them now (not background preloads).
const showing = new Set();
// Set when Vite reports a file this tab expects is gone (a deploy replaced them).
let staleFiles = false;

// Loads a page module (storefront-<name>/Page.jsx), once; a failed load is forgotten so the next
// attempt fetches it again. `show` says the page is wanted on screen now: if its files were replaced
// by a deploy, the tab reloads to get the new ones.
export function loadPage(name, show = true) {
  const key = '../storefront-' + name + '/Page.jsx';
  if (!modules[key]) return null;
  if (show && !ready.has(name)) showing.add(name);
  const load = (loaded[name] ||= modules[key]().then(module => {
    // Vite resolves a failed load with nothing once its preload error has been handled.
    if (!module) throw new Error('The ' + name + ' page did not load.');
    ready.add(name);
    return module;
  }));
  load.then(
    () => showing.delete(name),
    () => {
      if (showing.delete(name) && staleFiles) reloadOnce();
      if (loaded[name] === load) delete loaded[name];
    }
  );
  return load;
}

// Reloads at most once a minute, so a file that is really missing shows PageError instead of
// reloading forever. It waits a moment, so the site has put the page's URL in the address bar.
function reloadOnce() {
  try {
    const last = Number(sessionStorage.getItem('vf-reloaded-at')) || 0;
    if (Date.now() - last < 60000) return;
    sessionStorage.setItem('vf-reloaded-at', String(Date.now()));
  } catch {
    return;
  }
  setTimeout(() => location.reload());
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
    Object.keys(modules).forEach(key =>
      loadPage(key.split('/')[1].slice(11), false)?.catch(() => {})
    );
  if ('requestIdleCallback' in window) requestIdleCallback(run);
  else setTimeout(run, 200);
}

// Vite reports a failed load with an event before failing it; note it, and let loadPage decide
// (a background preload never reloads the page someone is using).
export function reloadOnStaleFiles() {
  window.addEventListener('vite:preloadError', event => {
    staleFiles = true;
    event.preventDefault();
  });
}
