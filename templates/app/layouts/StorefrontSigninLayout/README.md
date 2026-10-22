# StorefrontSigninLayout

Sign-in Atomic Design template with React-node slots for the phone step, code step and feedback/continuation state. It owns the main focus target and narrow form wrapper, preserving the existing classes and slot order.

The View conditionally constructs each step and retains validation summaries, phone/code inputs, resend status, policy links and continuation controls. Sign-in logic retains validation, countdown configuration, code handling, customer synchronization, authentication and checkout return. This layout owns no data, callbacks, persistence or browser effects.

Verify invalid phone/code focus, code completion and SMS autofill, resend timing, phone-step return, checkout continuation, customer isolation, hydration and English/Persian responsive layouts.

StorefrontSigninHeading composes the phone/code h1/accent and introduction from explicit text without adding a wrapper. View retains step visibility and localized mapping, including the code phone-message bidi isolates. This layout retains the narrow wrapper and slot order; sign-in/shared logic retains validation/focus, resend, authentication and continuation.
