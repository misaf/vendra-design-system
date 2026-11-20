# StorefrontConsent

Storefront-specific privacy notice, with phone card and wider bottom-bar layouts selected by existing CSS.

Shell supplies visibility, bilingual title/body/action labels, the policy URL, and close/accept/essential callbacks. The existing workflow in `src/storefront/shell/navigation.js` and tracking integration retains persistence, analytics gating, session-only dismissal and focus restoration to the footer trigger. The organism reads no store or browser state and performs no persistence.

Preserve `vf-consent`, `vf-consent-title`, the focusable section, docking classes and action attributes: the shared consent workflow and shell height measurements rely on them. Shell keeps the banner in its bottom bar above the page action and tab bar.

`StorefrontConsent.spec.mjs` covers English/Persian content and policy destination, stable IDs/focus target, isolated pointer/Enter/Space callbacks, keyboard action order, controlled visibility and responsive axe/containment at phone, tablet and desktop widths. Callbacks report actions without changing the supplied visibility.

Persistence, analytics gating, first-visit decisions and footer focus restoration remain covered by [`privacy-analytics.spec.mjs`](../../../../../e2e/storefront/privacy-analytics.spec.mjs) and the touch rotation cases in [`devices.spec.mjs`](../../../../../e2e/devices/devices.spec.mjs).
