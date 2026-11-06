# StorefrontSavedLayout

Saved-products Atomic Design template with heading, notice, results and empty-state React-node slots, plus externally controlled results/empty visibility. It owns the main focus target, heading wrapper, responsive product grid and empty-state wrapper. Notices remain outside both conditional groups so removing the final product can still expose Undo.

The View retains conditional slot construction, product cards, copy, count, links and remove/Undo controls. Saved-page and shared site logic retain saved-list state, persistence, customer synchronization, additive Undo and focus restoration. This layout owns no data, callbacks, persistence or browser effects.

Preserve wrapper classes and `data-vf-keep-focus`. Verify removal/Undo focus, final-product empty recovery, preservation of other saved changes, account/product synchronization, reload persistence, product navigation, hydration and English/Persian responsive layouts.

StorefrontSavedHeading composes the package h1 SectionHeader from explicit eyebrow/title/accent props. View retains localized mapping, saved/shared logic retain count wording and list state, and this layout retains the heading wrapper.

StorefrontSavedRemovalNotice composes removal feedback and Undo. View retains removed-message visibility and localized mapping; saved/shared logic retain additive restoration, persistence and focus. The notice remains outside results/empty groups for final-item recovery.

StorefrontSavedResults composes saved-product cards from explicit products/labels without a DOM wrapper. View retains results visibility/list normalization; saved/shared logic retain product descriptors, removal and focus. This layout retains the responsive grid.

StorefrontSavedEmpty composes empty messaging and the primary shop link without a DOM wrapper. View retains empty visibility/localized mapping; saved/shared logic retain membership/removal/Undo. This layout retains centered empty placement and the notice outside it for recovery.

Saved View passes this layout and results/empty organisms directly without single-child fragments. Visibility, localized descriptors, list normalization, callbacks and the empty Shell sticky-slot fragment remain unchanged.
