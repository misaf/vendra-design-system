# StorefrontCheckoutSummary

Composes OrderSummary in its original Card with padding 20, taking explicit title/lines/sums props. The layout retains summary column and sticky-panel ownership.

View/logic retain payment visibility, item/price mapping, totals, discounts, delivery quote rules and formatting. No page model, calculations, state/effects, browser APIs or commerce rules belong here.

Verify bilingual item/total rows, promo/delivery and changed-amount continuity, method selection, pending/error visibility, touch/tablet/TV layout, overflow and accessibility. Compare summary Card captures with the unchanged baseline.
