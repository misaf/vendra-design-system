# StorefrontAccountAddressEditor

Composes controlled address label/zone/pin/address/recipient/phone fields from explicit descriptors. Preserves field/map IDs, compact LocationPicker props and callbacks, independent map/fallback visibility, pin wrapper/fallback classes, multiline address/error/autocomplete, recipient autocomplete and PhoneInput/error. Returns a fragment so the existing dialog owns spacing.

View retains address-branch visibility and the shared dialog, storage alert, error summary and save/cancel actions. Account/shared logic retains drafts, location/zone rules, map/geolocation failure state, validation/focus, customer scope, mutations and persistence; package LocationPicker retains map/geolocation lifecycle. No state, effects, browser APIs or address rules belong here.

Verify bilingual blank/filled/edit/fallback fields, pin/zone changes, error summary links and focus, localized phone validation, save/cancel and storage retry, persisted addresses, touch/keyboard use, rotation, overflow and accessibility against the previous version.
