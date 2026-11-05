# StorefrontBagSummary

Composes the summary Card/OrderSummary, optional free-delivery Meter, controlled PromoCodeField, responsive delivery/payment actions, back link and payment note. Receives explicit summary rows/sums/title, meter descriptor, promo descriptor, action descriptors (visibility/labels/callbacks and back href) and payment note. Preserves fragment structure, classes/order, card padding, promo ID and action semantics.

View retains content visibility and descriptor mapping. Bag/shared logic retains totals/pricing, discounts, quote/free-delivery rules, promo validation/persistence, step state, delivery/payment validation and navigation. Shared components retain promo focus management and accessibility. Sticky actions remain in Shell. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual amounts, invalid/applied/removed promos and focus, promo persistence through delivery/payment, meter thresholds, validation/navigation/back, compact sticky continuation, tablet rotation, empty-summary removal, overflow and accessibility. Compare summary regions with the unchanged baseline.
