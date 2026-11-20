# StorefrontAccountAddresses

Composes the optional saved-address map and address-card/add grid from explicit map, normalized addresses, labels and add descriptors. Preserves map ID, margin/height, loader/tiles/center/zoom/selection/failure props; grid classes and positional keys; AddressCard labels/default/edit/delete callbacks; and add-button ID/type/classes/action. Adds no wrapper.

View retains tab visibility and list normalization. Account/shared logic retains customer scope, location eligibility/formatting, map failure state, address mapping, editor state/validation/focus, default/delete/save mutations and persistence. Package PlacesMap retains its map lifecycle. No state, effects, browser APIs or address rules belong here.

Verify English/Persian map markers and editor entry, default/edit/delete/add actions, failed-map and empty states, persistence/tab continuity, customer isolation, touch/keyboard use, rotation, overflow and accessibility against the previous version.

Isolated fixture/spec coverage exercises bilingual address content, per-row edit/delete/default callbacks, controlled default display, local Leaflet marker callbacks, loader failure forwarding, empty/add target, axe and compact containment. Tiles are stubbed. Map-failure UI, mutations, editor state and persistence remain in the owner/page logic.
