// Globals the shared storefront logic reads but does not declare itself.
// Type-checked with `npm --prefix apps/florist run typecheck`; nothing here ships to the browser.
// The integrations and page-wide state are not globals: modules import vfRuntime from
// shared/platform/runtime.js. tools/app-dependencies.mjs fails any window.VF_* or window.AG_* access.

interface Window {
  // The runtime, exposed by the Next.js client entry for tests and QA.
  __vfRuntime?: import('../shared/platform/runtime.js').VfRuntime;
  // The click-through site's page object (shell/session/useStorefrontSession.js), for tests.
  __vfSite?: any;
  // Leaflet, loaded on demand by shared/domain/location.js.
  L: any;
}
