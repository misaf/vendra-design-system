# StorefrontBagSender

Composes the sender section/title/hint and controlled name/phone grid from explicit labels and field descriptors. Preserves section/heading/input IDs, classes/order, labels, required/error props, name autocomplete, phone keypad/direction/placeholder and shared PhoneInput defaults.

View retains descriptor mapping and delivery-step visibility. Bag/shared logic retains sender values, signed-in prefill, validation, persistence, customer isolation and error-summary focus. No page model, state/effects, browser APIs or commerce rules belong here.

`StorefrontBagSender.spec.mjs` covers the named section/title/hint, English/Persian labels and IDs, required/autocomplete/phone semantics, controlled editing and supplied updates, isolated callbacks and phone metadata, field keyboard order, supplied errors and clearing, compact containment and axe in empty/filled/error states.

Signed-in prefill, customer isolation, validation rules, error-summary focus, persistence/reload and bag/delivery round trips remain page-level coverage.
