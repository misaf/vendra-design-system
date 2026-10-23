# StorefrontSavedLayout

Saved-products Atomic Design template with heading, notice, results and empty-state React-node slots, plus externally controlled results/empty visibility. It owns the main focus target, heading wrapper, responsive product grid and empty-state wrapper. Notices remain outside both conditional groups so removing the final product can still expose Undo.

The View retains conditional slot construction, product cards, copy, count, links and remove/Undo controls. Saved-page and shared site logic retain saved-list state, persistence, customer synchronization, additive Undo and focus restoration. This layout owns no data, callbacks, persistence or browser effects.

Preserve wrapper classes and `data-vf-keep-focus`. Verify removal/Undo focus, final-product empty recovery, preservation of other saved changes, account/product synchronization, reload persistence, product navigation, hydration and English/Persian responsive layouts.

StorefrontSavedHeading composes the package h1 SectionHeader from explicit eyebrow/title/accent props. View retains localized mapping, saved/shared logic retain count wording and list state, and this layout retains the heading wrapper.

StorefrontSavedRemovalNotice composes removal feedback and Undo. View retains removed-message visibility and localized mapping; saved/shared logic retain additive restoration, persistence and focus. The notice remains outside results/empty groups for final-item recovery.
