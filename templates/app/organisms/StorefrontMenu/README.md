# StorefrontMenu

Storefront-specific compact menu drawer composed from Dialog, MenuList, NavLink, LanguageSwitch and Button.

Shell supplies the controlled open state, close callback, title, navigation items, optional language data and callback, and optional WhatsApp link. Feature filtering, routing and language state stay in storefront logic; Shell closes the drawer when the viewport widens to the desktop header.

Navigation links invoke the close callback, including links to the current route.

The package Dialog retains focus trapping, dismissal and trigger focus restoration. Keep the existing markup, classes and start placement for English/Persian layouts. This organism does not read the store or persist state.

Verify with `menu.spec.mjs` and the shell tier/resize cases in `mobile-layout.spec.mjs`.
