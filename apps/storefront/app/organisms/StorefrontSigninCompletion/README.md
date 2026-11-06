# StorefrontSigninCompletion

Composes sign-in success feedback and continuation actions from explicit heading/body text, independent checkout/non-checkout flags and checkout/account link descriptors, plus an optional `namePrompt` ({text, label, href}) rendered as a quiet paragraph with a profile link between the feedback and the actions. Preserves the check/accent EmptyState with h1, action wrapper/classes, branch order, primary checkout link with trailing arrow-right, ghost account alternative and ordinary primary account link. Returns a fragment without adding a wrapper.

View retains completion visibility and localized descriptor mapping. Sign-in/shared logic retains customer naming, authentication, customer synchronization, checkout eligibility/destinations and the checkout callback. Shared shell/router retains navigation and focus; package components retain feedback/action semantics. No state, effects, browser APIs or sign-in rules belong here.

Verify bilingual named/unnamed greetings for new and returning accounts (never a sample name), the name prompt, ordinary and checkout action variants/order, destinations, callback-driven same-document continuation, authenticated account access and preserved checkout drafts. Compare markup, touch/rotation, keyboard use, desktop/TV, containment and accessibility against the previous version.
