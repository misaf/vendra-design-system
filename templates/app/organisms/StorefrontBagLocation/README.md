# StorefrontBagLocation

Composes controlled LocationPicker/zone status, failed-map hint/zone Select and address Input from explicit picker, zone, fallback and address descriptors. Returns a fragment inside the page-owned recipient section. Preserves classes/order, map/zone/address IDs, labels/status/errors, required/autocomplete settings and all map adapter/lifecycle callbacks.

View retains descriptor mapping and surrounding delivery composition. Bag/shared logic retains map loading/failure state, geolocation handling, location updates, zone/fee/eligibility rules, fallback selection, address validation, persistence and focus. LocationPicker retains map interaction/accessibility. No page model, state/effects, direct browser APIs or commerce rules belong here.

Verify bilingual pending/error/pinned states, pin-required focus and quote updates, saved-address pin isolation, map-load failure and typed-address fallback, zone selection, persisted address/location, touch/tablet rotation, keyboard pinning, overflow and accessibility. Compare map/status and fallback regions with the unchanged baseline.
