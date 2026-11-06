# StorefrontTrackPendingNotice

Composes the tracking pending-payment message from explicit title/body props. Preserves the measure-width wrapper, neutral Alert, clock icon and body content. Adds no wrapper beyond the existing markup.

View retains order/pending visibility and localized prop mapping. Tracking logic retains payment-method/status eligibility and localized message selection, last-four/contact formatting and bidi isolation. Package Alert retains status semantics. This organism owns no state, rules, persistence or browser effects.

Verify bilingual card and WhatsApp notices, status/method transitions, last-four/contact details, recipient-phone fallback, absence outside pending orders and responsive markup against the previous version.
