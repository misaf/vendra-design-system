# StorefrontPresentationShortlist

Storefront organism for the presentation shortlist comparison dialog. Receives controlled open/items/price visibility, localized labels, a label renderer and close/clear/send callbacks explicitly from the View. Each item supplies its own show/remove callbacks.

Owns dialog/footer, comparison cards, images, optional prices, item actions and empty-state composition. The View retains the shared Label helper through `renderLabel`. Presentation logic retains shortlist membership/order, product identity and stock interpretation, viewer source/index, removal, clear/Undo, customer reset and sharing/handoff state. This organism owns no state, browser effects or business rules and never imports page logic.

Preserve classes, item keys, image sizes, dialog width, labels and action wiring. Verify populated/empty/sold-out/hidden-price states, comparison-to-viewer mapping after removal, remove-to-empty, clear/Undo, send payloads, close/focus return, bilingual accessibility and responsive/touch rendering.
