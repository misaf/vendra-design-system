# StorefrontFooter

Storefront-specific footer composition, owned by the app rather than the published component package.

Shell supplies explicit brand, social, navigation, contact (including `directionsLinks`, the Neshan/Balad/Google Maps links listed under the directions label in the order given), trust seal and credit content, plus the consent settings label and callback. Shell retains routing, feature filtering, consent state and focus restoration. The footer does not read the store or persist state.

FooterLinks shares the supplied navigation groups between expanded columns and the phone Accordion. CSS selects the layout; the Accordion owns disclosure state. Preserve the consent trigger IDs because the consent workflow restores focus to them.

`StorefrontFooter.spec.mjs` covers English/Persian supplied content, navigation order/current state/destinations, desktop/phone consent trigger IDs and callbacks, independent phone disclosures across resizing, social/directions/contact/credit/trust attributes, optional content and empty collections, dark-logo selection, axe and responsive containment. Fixtures use local images and do not open external destinations.

Consent state/persistence and focus restoration, routing and shared Shell effects remain integration responsibilities in `footer.spec.mjs`, including touch and rotation coverage. The package Accordion owns disclosure mechanics; TrustSeal owns issuer-image loading/fallback behavior.
