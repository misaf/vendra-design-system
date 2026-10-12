// Globals the shared storefront logic reads but does not declare itself.
// Type-checked with `npm --prefix templates run typecheck`; nothing here ships to the browser.

interface Window {
  // AG_*: the package helpers (components/utils/), set by guidelines/card-runtime.js for the cards.
  AG_COMMERCE: any;
  AG_DATES: any;
  AG_FORMAT: any;
  // VF_*: from the Vendra Florist templates. Routing and <head> (_shared/seo.js), focus (_shared/page-focus.js).
  VF_NAV: any;
  VF_SEO: any;
  // Integrations defined in _shared/integrations/ and _shared/payments.js.
  VF_API: any;
  VF_TRACK: any;
  VF_PAYMENT: any;
  // Set by app/theme.js.
  VF_ASSET_BASE: string;
  VF_USE_TENANT?: (tenant: string) => void;
  // Page state shared between templates in one document.
  VF_TENANT?: string;
  VF_VIEWED?: boolean;
  // Leaflet, loaded on demand by _shared/location.js.
  L: any;
  vfLeafletLoading?: Promise<any>;
}
