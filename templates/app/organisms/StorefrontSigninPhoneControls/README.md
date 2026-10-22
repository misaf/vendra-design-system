# StorefrontSigninPhoneControls

Composes the phone-step error summary, controlled phone input and send-code button from explicit problems, phone and send descriptors. Preserves summary/input IDs, placeholder, label/value/change/error mapping and primary large block button. Returns a fragment without adding a wrapper.

View retains phone-step visibility, localized descriptor mapping and heading; StorefrontSigninPolicies retains the policy note. Sign-in/shared logic retains phone state, validation, summary targets/focus, code-step transition, resend, authentication and checkout continuation. Package components retain field semantics, phone normalization metadata, error links and activation. No state, effects, browser APIs or sign-in rules belong here.

Verify bilingual initial/invalid phone states, error-summary links/focus, local-number variants, error clearing, code-step transition, change-number retention, demo completion and checkout return. Compare markup, touch/rotation, keyboard use, desktop/TV, containment and accessibility against the previous version.
