# StorefrontCheckoutProgress

Composes compact and wide Steppers from explicit steps/current, optional onStepClick, region/done labels and number/caption formatters. Preserves breakpoint wrappers, ordered-list/current-step semantics, labels and compact caption. The View keeps the payment-only vf-checkout-steps spacing wrapper; bank and success receive the same fragment without adding a wrapper.

View/logic retain payment/bank/success visibility, current index, localized steps/formatting and permitted navigation callbacks. Only the payment instance receives onStepClick; bank/success stay noninteractive. No page model, state/effects, browser APIs or payment rules belong here.

Verify bilingual payment step navigation and receipt continuity, bank/success indices and noninteractive completed steps, compact captions, touch/tablet rotation, keyboard activation, overflow and accessibility. Compare each state's compact/wide progress with the unchanged baseline.
