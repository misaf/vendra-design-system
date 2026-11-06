// The storefront's runtime: the browser integrations and page-wide state every page, the shell and
// the shared logic use, in one object that modules import instead of reading window globals.
// app/runtime.js installs the API client and analytics (shared/services/integrations/runtime.js) and
// app/theme.js the asset base and tenant loader, both before the first render. In the build's
// prerender nothing is installed: the integrations stay null, and code that renders on the server
// must not call them (effects and event handlers run in the browser only).

/**
 * @typedef {object} VfApi The Vendra API client (shared/services/integrations/api.js).
 * @property {string} base
 * @property {boolean} live
 * @property {(base: string) => void} setBase
 * @property {{read: number, write: number}} timeouts
 * @property {(order: any) => Promise<any>} checkout
 * @property {(number: string) => Promise<any>} orderPayment
 * @property {(number: string) => Promise<any>} payAgain
 * @property {(payload: any) => Promise<any>} inquiry
 * @property {(email: string, name?: string) => Promise<any>} newsletter
 * @property {() => Promise<any>} loadStock
 * @property {() => Promise<string[] | null>} loadSaved
 * @property {(id: string) => Promise<any>} saveItem
 * @property {(id: string) => Promise<any>} unsaveItem
 * @property {() => string} preferredLocale
 */

/**
 * @typedef {object} VfTracker Analytics (shared/services/integrations/analytics.js).
 * @property {(name: string, params?: object) => void} event
 * @property {(product: any, qty?: number, unit?: number) => object | null} item
 * @property {Record<string, any>} EVENTS
 * @property {object[]} log The last 50 events, for QA.
 * @property {() => string} consent The visitor's choice: 'all', 'essential' or '' (not chosen yet).
 * @property {(value: string) => void} setConsent
 * @property {(listener: (event: object) => void) => () => void} subscribe
 * @property {() => Record<string, string>} attribution Where the visit came from (utm_* values and
 *   the referrer's host).
 */

/**
 * @typedef {object} VfRuntime
 * @property {VfApi | null} api The API client; null until installed (and on the server).
 * @property {VfTracker | null} track Analytics; null until installed (and on the server).
 * @property {any} payment Card helpers (shared/domain/payments.js: bankOf, luhn, setPayCard); null
 *   until installed (and on the server).
 * @property {string} assetBase Where product images, map scripts and tenant themes are served
 *   from (the build's base path); '' until app/theme.js sets it.
 * @property {(tenant: string) => void} useTenant Loads a tenant's theme stylesheet; a no-op until
 *   app/theme.js installs the loader.
 * @property {string} tenant The tenant whose theme this document shows ('' before the first).
 * @property {boolean} viewed Whether this document has shown a page yet (SPA page views).
 * @property {'' | 'hydrated' | 'rendered'} rendered How app/main.jsx showed the page, for tests.
 */

/** @type {VfRuntime} */
export const vfRuntime = {
  api: null,
  track: null,
  payment: null,
  assetBase: '',
  useTenant: () => {},
  tenant: '',
  viewed: false,
  rendered: ''
};
