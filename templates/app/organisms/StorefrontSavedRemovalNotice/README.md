# StorefrontSavedRemovalNotice

Composes the saved-product removal notice from explicit message and undo label/callback props. Preserves the notice wrapper, package Alert title/action slot, secondary Undo button, vf-saved-undo ID and data-vf-keep-focus attribute. Adds no wrapper beyond the existing markup.

View retains removed-message visibility and localized prop mapping. Saved/shared logic retain the last removed product, additive Undo, persistence, synchronization and focus restoration. Package Alert/Button retain status and action semantics. Layout keeps the notice outside results/empty groups so final-item removal still offers recovery. This organism owns no state, mutations, persistence or browser effects.

Verify bilingual notice copy, focus on removal, additive Undo without reverting other changes, final-item recovery, favorite-button focus restoration, reload persistence and responsive markup against the previous version.
