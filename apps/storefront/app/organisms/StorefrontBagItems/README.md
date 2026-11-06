# StorefrontBagItems

Composes editable LineItems and per-line stock warnings from normalized line records, remove/quantity labels and a quantity formatter. Preserves list/row classes, order, `data-vf-keep-focus`, images, configured metadata/card notes, prices, unavailable state, quantity bounds and individual quantity/remove callbacks.

View retains bag-step/content visibility and normalization. Bag/shared logic retains product availability, shared stock limits, pricing, quantity/removal/Undo, persistence, totals and focus restoration. Undo notice and empty state stay outside the conditional contents. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual configured lines, quantity updates/limits, removal and Undo without reverting another line, persisted values, final-item recovery, unavailable and excess-quantity warnings, touch/rotation, TV keyboard activation, overflow and accessibility. Compare list regions with the unchanged baseline.
