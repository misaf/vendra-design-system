# StorefrontAnnouncement

Storefront-specific news strip composed from AnnouncementBar and Icon. Shell supplies full and phone text, the accessible region and close labels, the optional action link, and the close callback. An empty full message renders nothing.

CSS selects the phone text below 768px; matching messages render once. Existing link styling and the RTL-aware arrow are preserved. Delivery cut-offs, translated copy, feature decisions and session dismissal stay in shared storefront logic. This organism reads no store or browser state and performs no persistence.

Verify with the announcement cases in `components-in-use.spec.mjs` and `features.spec.mjs`, plus the shell tier/resize cases in `mobile-layout.spec.mjs`.
