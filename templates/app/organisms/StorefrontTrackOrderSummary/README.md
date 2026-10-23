# StorefrontTrackOrderSummary

Composes the tracking summary card from explicit title/lines/sums props. Preserves the package Card with padding 20 and OrderSummary without adding a wrapper.

View retains order visibility and localized prop mapping. Tracking/shared logic retain order selection, line images/tokens/configurations/quantities/card notes/prices and totals/discount/balance formatting. Package OrderSummary retains headings, line rendering and subtotal semantics. StorefrontTrackLayout retains the responsive aside and sticky placement. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual lines/quantities/notes/totals, free and paid delivery, discounts/balance deductions, visibility across order statuses and lookup, sticky/responsive placement and markup against the previous version.
