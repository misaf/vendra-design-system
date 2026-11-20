# StorefrontAnnouncement

Storefront-specific news strip composed from AnnouncementBar and Icon. Shell supplies full and phone text, the accessible region and close labels, the optional action link, and the close callback. An empty full message renders nothing.

CSS selects the phone text below 768px; matching messages render once. Existing link styling and the RTL-aware arrow are preserved. Delivery cut-offs, translated copy, feature decisions and session dismissal stay in shared storefront logic. This organism reads no store or browser state and performs no persistence.

`StorefrontAnnouncement.spec.mjs` covers English/Persian phone/wider text, matching-message deduplication, supplied action destination and arrow class, independent action/dismissal visibility, isolated pointer/Enter/Space close callbacks, empty full-message suppression, axe and responsive containment. Callback reporting does not dismiss the controlled message.

Delivery cut-offs, session dismissal and shared Shell behavior remain covered by [`delivery-time-zone.spec.mjs`](../../../e2e/delivery-time-zone.spec.mjs), [`components-in-use.spec.mjs`](../../../e2e/components-in-use.spec.mjs) and the shell tier/resize cases in [`mobile-layout.spec.mjs`](../../../e2e/mobile-layout.spec.mjs).
