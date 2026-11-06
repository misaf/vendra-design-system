# StorefrontShopResults

Composes the product grid, LoadMore and loading/error/empty feedback. Receives normalized products, frame, explicit hasItems/showPaging flags, paging descriptor, controlled feedback flags/callbacks and localized labels. Retains fragment structure, grid classes/order, first-two image priority, card fields/links/favorite actions, paging props, announcements and recovery controls.

View retains normalization and explicit state/label mapping. Shop/shared logic retains matching/sorting, pagination, URL state, product data/localization, favorites, navigation, first-new-card focus, retry and clear semantics. No page model, state/effects, browser APIs or commerce rules belong here. Independent visibility flags preserve existing behavior.

Verify English/Persian default/loaded pages, product identity/order, favorite persistence and product navigation; Show more URL/reload/focus; loading status, error retry, empty-state clear; responsive grid, touch rotation, overflow and accessibility. Compare result regions with the unchanged baseline.
