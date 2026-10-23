# StorefrontSavedResults

Composes saved-product cards from explicit products and photo/unsave labels. Preserves product order, indexed fragment keys, card images/name/subtitle/price/stock/badge, accent badge tone, soft frame, favorite=true, removal callback and product href. Adds no DOM wrapper; StorefrontSavedLayout owns the grid.

View retains results visibility, list normalization and localized mapping. Saved/shared logic retain product selection/descriptors, saved membership, pricing, remove/Undo, persistence and focus. Package ProductCard retains image/link/favorite semantics. This organism owns no state, mutations, persistence or browser effects.

Verify bilingual product ordering/content, links, favorite actions, removal/Undo focus, final-item recovery, additive saved changes, reload persistence and responsive grid markup against the previous version.
