# StorefrontBagRecipient

Composes the recipient h2, optional saved-address fieldset/chips and controlled name/phone grid from explicit title, saved descriptor and name/phone descriptors. Returns a fragment inside the existing page-owned delivery section. Preserves title/input IDs, field labels, required/error props, autocomplete settings, phone placeholder/direction, chip pressed state and grid classes/order.

View retains normalized records and descriptor mapping. Bag/shared logic retains saved-address eligibility/selection, recipient values, validation, persistence, pin/address updates and error-summary focus. The surrounding section and delivery/map flow stay in View. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual guest/signed-in fields, saved-address selection and pin isolation, required/error relationships, summary links/focus, typed values/Persian digits and reload, touch/tablet rotation, TV keyboard activation, overflow and accessibility. Compare field/choice regions with the unchanged baseline.
