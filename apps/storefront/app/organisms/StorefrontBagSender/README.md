# StorefrontBagSender

Composes the sender section/title/hint and controlled name/phone grid from explicit labels and field descriptors. Preserves section/heading/input IDs, classes/order, labels, required/error props, name autocomplete, phone keypad/direction/placeholder and shared PhoneInput defaults.

View retains descriptor mapping and delivery-step visibility. Bag/shared logic retains sender values, signed-in prefill, validation, persistence, customer isolation and error-summary focus. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual empty/error/filled fields, summary links/focus, corrected values/Persian digits, required/autocomplete semantics, signed-in prefill, reload and bag/delivery round trips, touch/tablet rotation, keyboard activation, overflow and accessibility. Compare sender regions with the unchanged baseline.
