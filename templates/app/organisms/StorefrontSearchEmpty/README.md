# StorefrontSearchEmpty

Composes the no-result count/status, search-x EmptyState and recovery actions from explicit countLabel/title/accent/body, retry (label, onClick) and browse (label, href) props. Preserves the status/content siblings, centered content and wrapping action row, primary retry button and secondary shop link without adding a wrapper.

View retains no-result visibility and localized mapping. Search/shared logic retain matching, counts, query and URL/history updates, retry clearing/focus, reporting and navigation. Package EmptyState/Button retain heading/icon/action semantics. StorefrontSearchLayout retains slot placement. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual zero-result count, h2/accent/body and decorative icon, touch and keyboard retry with searchbox focus, shop navigation/back with query recovery, populated-state absence, reload persistence and responsive markup against the previous version.
