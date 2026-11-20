# StorefrontMenu

Storefront-specific compact menu drawer composed from Dialog, MenuList, NavLink, LanguageSwitch and Button.

Shell supplies the controlled open state, close callback, title, navigation items, optional language data and callback, and optional WhatsApp link. Feature filtering, routing and language state stay in storefront logic; Shell closes the drawer when the viewport widens to the desktop header.

Navigation links invoke the close callback, including links to the current route.

The package Dialog retains focus trapping, dismissal and trigger focus restoration. Keep the existing markup, classes and start placement for English/Persian layouts. This organism does not read the store or persist state.

`StorefrontMenu.spec.mjs` covers English/Persian named navigation, order/current state, supplied destinations, pointer/Enter closing (including the current route), optional language and WhatsApp branches, safe external-link attributes, empty navigation, controlled language callbacks without dismissal, keyboard containment, Escape/close/outside dismissal and trigger focus restoration. Meaningful states pass axe at compact/tablet sizes.

Shell routing, language persistence, viewport resize dismissal and shared layout effects remain covered by `menu.spec.mjs` and the shell tier/resize cases in `mobile-layout.spec.mjs`. The fixture supplies controlled open/language state; the package Dialog owns modal mechanics.
