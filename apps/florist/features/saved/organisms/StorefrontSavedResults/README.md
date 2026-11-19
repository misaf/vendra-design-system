# StorefrontSavedResults

Composes saved-product cards from explicit products and photo/unsave labels. Preserves product order, indexed keys, card images/name/subtitle/price/stock/badge, accent badge tone, soft frame, favorite=true, removal callback and product href. Each card sits in a `vf-saved-card` column with its bag action below it, from an explicit `action` descriptor: `add` (button calling `onAdd`), `size` (link to the product page, where the size is chosen) or `unavailable` (disabled button, e.g. sold out). StorefrontSavedLayout owns the grid.

View retains results visibility, list normalization and localized mapping. Saved/shared logic retain product selection/descriptors, bag-action eligibility, bag changes and add/remove Undo, saved membership, pricing, persistence and focus. Package ProductCard retains image/link/favorite semantics. This organism owns no state, mutations, persistence or browser effects.

Verify bilingual product ordering/content, links, favorite actions, removal/Undo focus, final-item recovery, additive saved changes, reload persistence and responsive grid markup against the previous version.

Bilingual isolated fixture/spec coverage checks ordered card content/image/placeholder/destinations, supplied add/size/unavailable/absent bag actions, per-card removal through final-item/empty input, keyboard navigation, axe and compact containment inside StorefrontSavedLayout. Empty recovery, eligibility, mutations, persistence and removal focus policy remain in page integration coverage.
