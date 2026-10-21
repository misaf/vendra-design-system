# StorefrontProductLayout

Product-page Atomic Design template with React-node slots for breadcrumbs, gallery, details, related designs and feedback. It preserves the main landmark, responsive product grid, gallery wrapper and sticky details panel.

StorefrontProductGallery composes gallery, fullscreen action and controlled lightbox from explicit props. StorefrontProductHeading composes code/copy action, category/badge, price/stock and description. StorefrontProductConfiguration composes controlled size/add-on groups. The product View supplies purchase controls, configuration data/callback mapping, heading data/callback mapping, gallery/lightbox data/state/callback mapping, recently viewed content and its ErrorBoundary, added-to-bag dialog and toasts. Product logic retains configuration, totals, availability and purchase actions. The sticky purchase action remains a separate Shell slot. This layout has no store access, callbacks, persistence or browser effects.

Keep the existing classes and `main` focus target: shared responsive CSS and Shell's sticky/focus measurements rely on them. Verify product pricing, panel/content/code behavior, gallery/bag interactions, touch tablet shopping, phone rotation and hydration.
