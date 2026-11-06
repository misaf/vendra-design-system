# StorefrontFooter

Storefront-specific footer composition, owned by the app rather than the published component package.

Shell supplies explicit brand, social, navigation, contact, trust seal and credit content, plus the consent settings label and callback. Shell retains routing, feature filtering, consent state and focus restoration. The footer does not read the store or persist state.

FooterLinks shares the supplied navigation groups between expanded columns and the phone Accordion. CSS selects the layout; the Accordion owns disclosure state. Preserve the consent trigger IDs because the consent workflow restores focus to them.

Verify with `footer.spec.mjs` for English/Persian links, touch disclosures, consent focus, rotation, accessibility and overflow.
