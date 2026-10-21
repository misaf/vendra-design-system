# StorefrontPresentationToolbar

Storefront organism for the presentation's search, category strip, result status and customer-tool controls. Receives a controlled search descriptor, category label/items, result-count text and explicit action descriptors. Optional scan/start-over actions are supplied as descriptors or null; count badges are formatted by the View.

Owns control composition, existing IDs/classes, accessible labels and callback wiring. The layout retains sticky/density/visibility wrappers. Presentation View/logic retain query/category state, search submission, capability checks, count formatting, customer state, resume/reset behavior and all panel actions. This organism owns no state, browser effects, capability detection or business rules and never imports storefront page logic.

Preserve control order, grouping, status semantics, responsive classes and focus targets. Verify query/submit/clear, category filtering, counts, scan capability, shortlist/order/settings access, next-customer Undo, resume display, narrow touch/rotation, TV keyboard behavior and bilingual accessibility.
