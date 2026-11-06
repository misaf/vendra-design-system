# StorefrontContactFeedback

Composes contact API-failure feedback from an explicit message using the package danger Alert. Preserves alert role, decorative icon, title and original markup without adding a wrapper.

View retains API-error visibility and message mapping and no longer imports DS directly. Contact/shared logic retain localized failure wording, submission, busy/error state, draft retention and clearing on edit/retry. Package Alert retains announcement semantics; StorefrontContactLayout keeps feedback after the columns. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual failure wording, initial/pending/success absence, draft retention, clear-on-edit/retry, repeated failures, alert placement and responsive markup against the previous version.
