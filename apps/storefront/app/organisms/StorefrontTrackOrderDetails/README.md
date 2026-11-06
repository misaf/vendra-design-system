# StorefrontTrackOrderDetails

Composes the tracking details card from explicit rows. Preserves the sunken package Card with padding 20 and DetailList without adding a wrapper.

View retains order visibility and row mapping. Tracking/shared logic retain delivery, zone, schedule, recipient, gift-message and payment formatting/localization. Package DetailList retains definition-list semantics, decorative icons and wrapping. This organism owns no state, rules, persistence or browser effects.

Verify bilingual delivery/recipient/card-message/payment rows, missing-message fallback, payment methods, long content wrapping, absence during lookup and responsive markup against the previous version.
