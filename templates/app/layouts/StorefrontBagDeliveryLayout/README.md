# StorefrontBagDeliveryLayout

Bag delivery-section layout with React-node recipient/location slots. Owns the existing section, spacing classes and aria-labelledby relationship to the recipient slot’s vf-recipient-title h2. Renders recipient before location without adding another wrapper.

View retains hasItems/onDelivery visibility and all recipient, saved-address, map, zone and address descriptors/callbacks. StorefrontBagRecipient and StorefrontBagLocation retain content; logic retains validation, saved addresses, map lifecycle/fallback, delivery state and totals. This layout imports only React and owns no data, callbacks, persistence or browser effects.

Preserve the recipient heading ID, field order and section classes. Verify bilingual bag/delivery visibility, validation and map focus, saved-address selection, pin/zone/address behavior, payment continuation, back/reload, map fallback, tablet rotation, containment, accessibility and screenshots against the previous version.
