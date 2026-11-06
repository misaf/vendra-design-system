# StorefrontSigninLayout

Sign-in Atomic Design template with React-node slots for the phone step, code step and feedback/continuation state. It owns the main focus target and narrow form wrapper, preserving the existing classes and slot order.

The View conditionally composes each step and maps organism descriptors. Sign-in logic retains validation, countdown configuration, code handling, customer synchronization, authentication and checkout return. This layout owns no data, callbacks, persistence or browser effects.

Verify invalid phone/code focus, code completion and SMS autofill, resend timing, phone-step return, checkout continuation, customer isolation, hydration and English/Persian responsive layouts.

StorefrontSigninHeading composes the phone/code h1/accent and introduction from explicit text without adding a wrapper. View retains step visibility and localized mapping, including the code phone-message bidi isolates. This layout retains the narrow wrapper and slot order; sign-in/shared logic retains validation/focus, resend, authentication and continuation.

StorefrontSigninPhoneControls composes the controlled phone input, summary and send action. View retains phone-step visibility, localized descriptors and heading; StorefrontSigninPolicies retains the policy note; sign-in/shared logic retains validation, focus, phone state and code-step transitions. This layout retains the wrapper and slot order.

StorefrontSigninCodeControls composes the controlled five-digit code input, summary and verify action. View retains code-step visibility, localized descriptors and heading; StorefrontSigninResend/StorefrontSigninChangeNumber retain their controls; sign-in/shared logic retains validation, focus, verification and continuation. Package CodeInput retains digit cleaning, completion and Web OTP effects.

StorefrontSigninResend composes the countdown/action and application resend status. View retains code-step visibility and mapping; package ResendCode retains timing, visibility updates, cleanup, announcements and tracking. Sign-in/shared logic retains wait configuration, code/error reset, feedback state and code-field focus.

StorefrontSigninPolicies composes the localized policy note and native terms/privacy links. View retains phone-step visibility and mapping; sign-in/shared logic retains destinations and the shared shell/router retains navigation, history and focus behavior.

StorefrontSigninCompletion composes success feedback and ordinary/checkout continuation actions. View retains completion visibility and localized mapping; sign-in/shared logic retains customer naming, authentication/synchronization, branch eligibility, destinations and checkout callback. This layout retains the narrow wrapper and slot order.

StorefrontSigninChangeNumber composes the controlled change-number button after resend controls. View retains code-step visibility and copy mapping; sign-in/shared logic retains the phone-step return, phone retention and code/resent reset.

Sign-in View passes this layout directly to Shell and completion directly to its feedback slot. Multi-child phone/code fragments and the empty sticky-slot fragment remain; visibility expressions, descriptor mapping and slot/branch order are preserved.
