// Where the storefront runs: a browser tab, or Node while the build prerenders one address
// (app/entry-server.jsx). Shared code reads the page's address and the asset base here, never
// window or location at import time, so every module also loads and renders on the server.
let vfServerState = null;
let vfHeldTime = null;

// The build sets the address it is rendering ({url, base, origin, time}) and clears it afterwards
// (null). `url` is the path (with the build's base), `base` the build's base path, `origin` the
// store's public origin ('' when unknown: canonical and preview links are then written from the site
// root) and `time` the moment pages render at (vfNow).
/** @param {{url: string, base?: string, origin?: string, time?: number} | null} options */
export function vfServerRender(options) {
  vfServerState = options ? {base: '/', origin: '', time: Date.now(), ...options} : null;
}

// The time pages render at. Delivery days, cut-offs and the like depend on it, so the browser renders
// its first pass over the prerendered markup at the moment the build rendered it (vfHoldClock), and
// then again at the real time; otherwise it is now.
export function vfNow() {
  if (vfServerState) return new Date(vfServerState.time);
  return new Date(vfHeldTime ?? Date.now());
}

// Holds vfNow at `time` (milliseconds) while the browser hydrates the prerendered markup (app/
// main.jsx), and lets it run again with null (page-lifecycle.js, once the page has hydrated).
// Returns whether it was held.
/** @param {number | null} time */
export function vfHoldClock(time) {
  const held = vfHeldTime != null;
  vfHeldTime = time;
  return held;
}

// The storefront page the prerender rendered (page-lifecycle.js records it as it renders), so the
// build writes that page's <head>; null in the browser.
export function vfServerPage(page) {
  if (!vfServerState) return null;
  if (page) vfServerState.page = page;
  return vfServerState.page || null;
}

// Whether this render has no browser: the build's prerender, or any Node import.
export function vfOnServer() {
  return vfServerState != null || typeof window === 'undefined';
}

// The page's address as a URL: the browser's, or the address being prerendered.
export function vfLocation() {
  if (vfServerState) return new URL(vfServerState.url, vfServerState.origin || 'http://localhost');
  if (typeof location === 'undefined') return new URL('http://localhost/');
  return new URL(location.pathname + location.search + (location.hash || ''), location.href);
}

// An absolute URL for `url` (read against the page's address), for canonical and preview links. On
// the server without a known origin it stays a path from the site root.
export function vfAbsoluteUrl(url) {
  if (!url) return undefined;
  try {
    const target = new URL(url, vfLocation());
    return vfServerState && !vfServerState.origin ? target.pathname + target.search : target.href;
  } catch {
    return undefined;
  }
}

// Where product images, map scripts and tenant themes are served from: the build's base path
// (app/theme.js sets VF_ASSET_BASE in the browser), or two folders up for pages opened from files.
export function vfAssetBase() {
  if (vfServerState) return vfServerState.base;
  return (typeof window !== 'undefined' && window.VF_ASSET_BASE) || '../../';
}
