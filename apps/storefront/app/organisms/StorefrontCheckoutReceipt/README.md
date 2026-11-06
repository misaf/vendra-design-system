# StorefrontCheckoutReceipt

Composes changed-amount confirmation, controlled PaymentCard/optional Sheba and receipt fields from explicit change/card/Sheba/last-four/reference descriptors. Preserves fragment order, warning/input IDs, focus target, card labels/amount, Sheba bdi/tooltip/copy action, grid classes, numeric direction/input mode, maximum length and error props. Change visibility remains independent of card visibility.

View retains descriptor mapping. Checkout/shared logic retains receipt-amount validation/confirmation, payment configuration, clipboard callbacks, digit normalization, error state, drafts/persistence and order submission. No page model, state/effects, direct browser APIs or commerce rules belong here.

Verify bilingual invalid/filled receipt inputs, Persian digit normalization, amount-change warning/blocking/confirmation, persisted values, method hiding/restoration, Sheba tooltip/copy and card copy, touch/tablet rotation, keyboard activation, overflow and accessibility. Compare receipt/card/warning/Sheba regions with the unchanged baseline.
