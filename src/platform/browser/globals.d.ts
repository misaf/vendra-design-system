// Globals the shared storefront logic reads but does not declare itself.
// Type-checked with `npm run typecheck`; nothing here ships to the browser.
// The integrations and page-wide state are not globals: modules import vfRuntime from
// src/platform/browser/runtime.js. tools/app-dependencies.mjs fails any window.VF_* or window.AG_* access.

interface Window {
  // The runtime, exposed by the Next.js client entry for tests and QA.
  __vfRuntime?: import('./runtime.js').VfRuntime;
  __vfDevStore?: typeof import('../../storefront/store/store-config.js').VF_STORE;
  // The click-through site's page object (src/storefront/session/useStorefrontSession.js), for tests.
  __vfSite?: any;
  // The standalone map fixtures use Leaflet's browser global.
  L: any;
}

// Turbopack loads styles imported by browser modules.
declare module '*.css' {}
