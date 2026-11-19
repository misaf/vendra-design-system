# StorefrontOrderSummaryCard

Storefront molecule shared by checkout and tracking: composes the package OrderSummary inside a Card with padding 20, taking explicit `title`, `lines` and `sums` props and adding no wrapper.

Checkout and tracking Views retain visibility and localized prop mapping. Page/shared logic retains line images/tokens/configurations/quantities/card notes/prices and totals/discount/delivery/balance formatting. Package OrderSummary retains headings, line rendering and subtotal semantics. StorefrontCheckoutLayout and StorefrontTrackLayout retain column and sticky placement. No page model, calculations, state/effects, browser APIs or commerce rules belong here.

Verify bilingual lines/quantities/notes/totals, free and paid delivery, discounts/balance deductions, checkout payment and tracking order states, sticky/responsive placement and markup against the previous version.
