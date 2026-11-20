# StorefrontPresentationCatalog

Storefront organism for the presentation catalog grid and its empty-state recovery. Receives tile data/callbacks, controlled empty/price visibility, localized labels, clear callback and a label renderer explicitly from the View.

Owns tile list/buttons, pictures, Ready badges, optional prices, shortlist controls and empty-state composition. The View retains the shared Label helper through `renderLabel`, toolbar, viewer/dialogs, density provider and offline preparation. Presentation logic retains search/filter matching, tile ordering, product-code identity, quoted prices, shortlist state, viewer actions, persistence and callbacks. This organism owns no state, browser effects or business rules and never imports storefront page logic.

`StorefrontPresentationCatalog.spec.mjs` covers English/Persian tile order, supplied labels/descriptions, responsive local images, Ready/price visibility, isolated open/shortlist pointer and keyboard callbacks, controlled pressed state, no-results recovery versus empty tile input, compact containment and axe. Product codes remain the visible names in both languages.

Filtering, stock/quote decisions, ordering, shortlist persistence/Undo and viewer focus remain page-level integration responsibilities. The fixture supplies a label renderer and owns callback state.
