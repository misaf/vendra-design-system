# StorefrontContactDetails

Composes the sunken details card, contact action row, protected studio map and directions from explicit rows, whatsapp/phone/instagram, map and directions descriptors. Preserves package props, classes, control order, safe external-link attributes, the vf-contact-map target and the map ErrorBoundary without adding a DOM wrapper. WhatsApp/Instagram/directions may be null; map.visible controls map rendering while map.onFail handles both load failures and boundary errors.

View maps localized descriptors, availability and callbacks. Contact/shared logic retain studio values, valid-location checks, channels, map loading/fallback and navigation. Package DetailList/Button/IconButton/PlacesMap/ErrorBoundary retain rendering and interaction semantics; StorefrontContactLayout retains the details wrapper and columns. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual details/actions, safe destinations and marker semantics, map failure leaving address/directions usable, responsive containment, form recovery and markup against the previous version.
