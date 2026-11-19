# StorefrontSigninPhoneControls

Composes the phone-step error summary, controlled phone input and send-code button from explicit problems, phone and send descriptors. Preserves summary/input IDs, placeholder, label/value/change/error mapping and primary large block button. Returns a fragment without adding a wrapper.

View retains phone-step visibility, localized descriptor mapping and heading; StorefrontSigninPolicies retains the policy note. Sign-in/shared logic retains phone state, validation, summary targets/focus, code-step transition, resend, authentication and checkout continuation. Package components retain field semantics, phone normalization metadata, error links and activation. No state, effects, browser APIs or sign-in rules belong here.

Verify bilingual initial/invalid phone states, error-summary links/focus, local-number variants, error clearing, code-step transition, change-number retention, demo completion and checkout return. Compare markup, touch/rotation, keyboard use, desktop/TV, containment and accessibility against the previous version.

Isolated coverage: colocated fixture/spec exercises supplied props and callback wiring in English/Persian, meaningful conditional states, keyboard activation, axe and compact containment. Phone/code specs cover controlled edits and validation-summary focus; completion covers optional name prompt and independently supplied continuation flags. Authentication, expiry, persistence and checkout routing stay in page integration tests. Shared Button keyboard link cancellation is covered separately in PR #330.
