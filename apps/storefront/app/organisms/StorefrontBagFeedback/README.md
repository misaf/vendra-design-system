# StorefrontBagFeedback

Composes the removal Alert/Undo (`variant="removed"`) or empty-state recovery (`variant="empty"`) from explicit localized labels and an action callback. Preserves wrapper classes, Undo ID/focus marker, button variants, empty h1/icon and content order. View mounts each variant in its existing layout slot; both stay outside conditional bag contents so final-item removal retains Undo.

View retains visibility and descriptor mapping. Bag/shared logic retains removed-line data, Undo merging, reset/recovery behavior, persistence and focus restoration. The current empty action restores the sample bag; this component forwards that callback. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual configured-line removal/Undo and focus, retention of other edits, final-item Undo, empty h1/action, reload persistence, recovery and restored rows, touch/tablet rotation, TV keyboard activation, overflow and accessibility. Compare notice and empty regions with the unchanged baseline.

`StorefrontBagFeedback.spec.mjs` covers simultaneous removal/empty feedback, the stable Undo target and callback, empty heading/body and keyboard recovery callback, with axe on combined and individual variants in English and Persian. The fixture records recovery actions; bag restoration and Undo merging remain page-level tests. Run with `npm run test:e2e:dev --workspace apps/storefront -- --project=storefront-components StorefrontBagFeedback`. Remaining coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
