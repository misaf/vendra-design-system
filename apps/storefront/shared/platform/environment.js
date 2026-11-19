// Shared address, clock, and asset helpers for the browser and Next.js static export.
import {vfRuntime} from './runtime.js';

let vfServerState = null;
let vfHydrating = false;
let vfRenderTime = 0;
let vfRenderBase = '';

export function vfConfigureRendering(base, time) {
  vfRenderBase = base;
  vfRenderTime = time;
}

export function vfSetHydrating(hydrating) {
  vfHydrating = hydrating;
}

// The build sets the address it is rendering ({url, base, origin, time}) and clears it afterwards
// (null). `url` is the path (with the build's base), `base` the build's base path, `origin` the
// store's public origin ('' when unknown: canonical and preview links are then written from the site
// root) and `time` the moment pages render at (vfNow).
/** @param {{url: string, base?: string, origin?: string, time?: number} | null} options */
export function vfServerRender(options) {
  vfServerState = options ? {base: '/', origin: '', time: Date.now(), ...options} : null;
}

// Let the browser hydrate date-dependent content at the same time used by the static export.
export function vfNow() {
  if (vfServerState) return new Date(vfServerState.time);
  const buildTime = vfOnServer() && vfRenderTime;
  return new Date(buildTime || Date.now());
}

// Whether this render has no browser: the build's prerender, or any Node import.
export function vfOnServer() {
  return vfServerState != null || vfHydrating || typeof window === 'undefined';
}

// The page's address as a URL: the browser's, or the address being prerendered.
export function vfLocation() {
  if (vfServerState) return new URL(vfServerState.url, vfServerState.origin || 'http://localhost');
  if (typeof location === 'undefined') return new URL('http://localhost/');
  return new URL(location.pathname + location.search + (location.hash || ''), location.href);
}

// An absolute URL for `url` (read against the page's address), for canonical and preview links. On
// the server without a known origin, the store's own URLs stay paths from the site root; a URL on
// another host (an image CDN) keeps its origin.
export function vfAbsoluteUrl(url) {
  if (!url) return undefined;
  try {
    const here = vfLocation();
    const target = new URL(url, here);
    return vfServerState && !vfServerState.origin && target.origin === here.origin
      ? target.pathname + target.search
      : target.href;
  } catch {
    return undefined;
  }
}

// Where product images, map scripts and tenant themes are served from: the build's base path
// (shell/tenant-theme.js sets vfRuntime.assetBase in the browser), or three folders up for pages opened from files.
export function vfAssetBase() {
  if (vfServerState) return vfServerState.base;
  return vfRuntime.assetBase || vfRenderBase || '../../../';
}

// Ignore device storage until Next.js has hydrated the static document.
export function vfStoredValue(key, session = false) {
  if (vfOnServer()) return null;
  try {
    const storage = session ? sessionStorage : localStorage;
    return storage.getItem(key);
  } catch {
    return null;
  }
}
