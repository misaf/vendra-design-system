# StorefrontSearchPopular

Composes popular search terms from an explicit title and normalized terms array (label, pick). Preserves the eyebrow, wrapping chip row, indexed fragment keys, term order and package Chip callbacks without adding a wrapper.

View retains empty-query visibility, localized title mapping and list normalization. Search/shared logic retain localized term descriptors, query matching, URL/history updates, reporting, navigation and focus. Package Chip retains button semantics. StorefrontSearchLayout retains slot placement. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual term order, touch and keyboard activation, query URL updates without history churn, results, clear/Escape recovery, empty-state absence and responsive markup against the previous version.
