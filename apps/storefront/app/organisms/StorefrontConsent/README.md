# StorefrontConsent

Storefront-specific privacy notice, with phone card and wider bottom-bar layouts selected by existing CSS.

Shell supplies visibility, bilingual title/body/action labels, the policy URL, and close/accept/essential callbacks. The existing workflow in `_shared/navigation.js` and tracking integration retains persistence, analytics gating, session-only dismissal and focus restoration to the footer trigger. The organism reads no store or browser state and performs no persistence.

Preserve `vf-consent`, `vf-consent-title`, the focusable section, docking classes and action attributes: the shared consent workflow and shell height measurements rely on them. Shell keeps the banner in its bottom bar above the page action and tab bar.

Verify with the first-visit cases in `features.spec.mjs`, footer reopening in `footer.spec.mjs`, and touch rotation in `devices.spec.mjs`.
