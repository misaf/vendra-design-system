# StorefrontBagItems

Composes editable LineItems and per-line price notices and stock warnings from normalized line records, remove/quantity labels and a quantity formatter. Preserves list/row classes, order, `data-vf-keep-focus`, images, configured metadata/card notes, prices, unavailable state, quantity bounds and individual quantity/remove callbacks.

View retains bag-step/content visibility and normalization. Bag/shared logic retains product availability, shared stock limits, pricing and repricing from the catalog, quantity/removal/Undo, persistence, totals and focus restoration. Undo notice and empty state stay outside the conditional contents. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual configured lines, quantity updates/limits, removal and Undo without reverting another line, persisted values, final-item recovery, unavailable and excess-quantity warnings, changed-price notices, touch/rotation, TV keyboard activation, overflow and accessibility. Compare list regions with the unchanged baseline.

`StorefrontBagItems.spec.mjs` covers configured line content, bounded quantity callbacks and per-line removal isolation, independent price/stock notices, unavailable-row controls and axe on populated/empty states in English and Persian. Repricing, Undo merging and persistence remain page-level tests. Run with `npm run test:e2e:dev --workspace apps/florist -- --project=storefront-components StorefrontBagItems`. Remaining coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
