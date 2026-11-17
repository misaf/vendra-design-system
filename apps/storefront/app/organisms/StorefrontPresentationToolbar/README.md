# StorefrontPresentationToolbar

Storefront organism for the presentation's search, category strip, result status and customer-tool controls. Receives a controlled search descriptor, category label/items, result-count text and explicit action descriptors. Optional scan/start-over actions are supplied as descriptors or null; count badges are formatted by the View.

Owns control composition, existing IDs/classes, accessible labels and callback wiring. The layout retains sticky/density/visibility wrappers. Presentation View/logic retain query/category state, search submission, capability checks, count formatting, customer state, resume/reset behavior and all panel actions. This organism owns no state, browser effects, capability detection or business rules and never imports storefront page logic.

`StorefrontPresentationToolbar.spec.mjs` covers English/Persian search IDs/metadata and external values, typing/submit/clear/Escape, category order and controlled keyboard selection, supplied count/status, isolated customer-action callbacks, optional scan/start-over and empty categories, responsive containment and axe. The fixture provides the existing toolbar grid/container context.

Filtering, count formatting, capability decisions, customer reset/Undo, panel transitions and device-specific display behavior remain page-level integration responsibilities.
