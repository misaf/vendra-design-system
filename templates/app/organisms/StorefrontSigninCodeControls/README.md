# StorefrontSigninCodeControls

Composes the code-step error summary, controlled five-digit code input and verify button from explicit problems, code and verify descriptors. Preserves summary/input IDs, label/value/change/complete/error/hint mapping and primary large block button. Returns a fragment without adding a wrapper.

View retains code-step visibility, localized descriptor mapping, heading, resend feedback and change-number action. Sign-in/shared logic retains code state, validation, error targets/focus, verification, customer synchronization and continuation. Package CodeInput retains digit cleaning, completion triggering and Web OTP lifecycle. No state, effects, browser APIs or sign-in rules belong here.

Verify bilingual initial/invalid/partial code states, error-summary links/focus, error clearing, Latin/Persian digits, completion/autofill, resend reset, change-number retention and local demo checkout continuation. Compare markup, touch/rotation, keyboard use, desktop/TV, containment and accessibility against the previous version.
