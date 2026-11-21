# StorefrontBagRecipient

Composes the recipient h2, optional saved-address fieldset/chips and controlled name/phone grid from explicit title, saved descriptor and name/phone descriptors. Returns a fragment inside the StorefrontBagDeliveryLayout section. Preserves title/input IDs, field labels, required/error props, autocomplete settings, phone placeholder/direction, chip pressed state and grid classes/order.

View retains normalized records and descriptor mapping. Bag/shared logic retains saved-address eligibility/selection, recipient values, validation, persistence, pin/address updates and error-summary focus. StorefrontBagDeliveryLayout owns the surrounding section; View retains delivery/map descriptor composition. No page model, state/effects, browser APIs or commerce rules belong here.

`StorefrontBagRecipient.spec.mjs` covers English/Persian labels and IDs, required/autocomplete/phone semantics, controlled editing and supplied updates, phone callback metadata, error relationships and clearing, saved-address order/pressed state and pointer/keyboard callbacks, hidden/empty saved options, compact containment and axe in empty/filled/error states. The fixture owns its values and selection; chip callbacks do not invent address or pin mutations.

The fixture uses `StorefrontBagDeliveryLayout` to exercise the actual section-to-heading association. Guest/signed-in eligibility, address/pin updates, validation rules, error-summary focus, persistence/reload and delivery round trips remain page-level coverage.
