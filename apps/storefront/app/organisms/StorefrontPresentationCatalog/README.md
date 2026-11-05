# StorefrontPresentationCatalog

Storefront organism for the presentation catalog grid and its empty-state recovery. Receives tile data/callbacks, controlled empty/price visibility, localized labels, clear callback and a label renderer explicitly from the View.

Owns tile list/buttons, pictures, Ready badges, optional prices, shortlist controls and empty-state composition. The View retains the shared Label helper through `renderLabel`, toolbar, viewer/dialogs, density provider and offline preparation. Presentation logic retains search/filter matching, tile ordering, product-code identity, quoted prices, shortlist state, viewer actions, persistence and callbacks. This organism owns no state, browser effects or business rules and never imports storefront page logic.

Preserve classes, tile keys, accessible open/star labels, image sizing and callback wiring. Verify category/search/clear, Ready/sold-out content, price visibility, shortlist toggle/Undo, viewer open/close focus, bilingual accessibility and responsive/touch rendering.
