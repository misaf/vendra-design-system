# StorefrontPresentationOrder

Storefront organism for the presentation order dialog. Receives controlled open/lines/price visibility/total/handoff eligibility, localized labels, a quantity formatter and close/clear/handoff callbacks explicitly from the View. Each line supplies quantity-change and removal callbacks.

Owns dialog/footer, LineItem mapping, optional prices/total and empty-state composition. Presentation logic retains quoted configurations, quantity/order mutations, stock interpretation, available-line totals, handoff eligibility/payloads, clear/Undo and customer isolation. This organism owns no state, browser effects or business rules and never imports page logic. Size/extra selection stays in the viewer; order rows retain quantity/removal controls only.

Preserve classes, line IDs, dialog width, quantity formatting and callbacks. Verify populated/empty/hidden-price states, quantity totals, removal, clear/Undo, mixed/all-sold-out eligibility and handoff filtering, close/focus return, bilingual accessibility and responsive/touch rendering.
