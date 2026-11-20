# StorefrontStepProgress

Storefront molecule shared by bag and checkout: composes compact and wide Steppers from explicit steps/current, optional onStepClick, region/done labels and number/caption formatters. Preserves breakpoint wrappers, ordered-list/current-step semantics, labels and compact caption, and adds no outer wrapper. Bag View wraps it in `vf-bag-steps`; StorefrontCheckoutLayout owns the payment-only `vf-checkout-steps` wrapper; StorefrontCheckoutBank and StorefrontCheckoutConfirmation render it unwrapped.

Views/logic retain visibility, current index, localized steps/formatting and permitted navigation callbacks. Bag and checkout payment pass onStepClick; bank/success stay noninteractive. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual bag/delivery and payment step navigation, bank/success indices and noninteractive completed steps, compact captions, touch/tablet rotation, keyboard activation, overflow and accessibility. Compare each state's compact/wide progress with the unchanged baseline.
