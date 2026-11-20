# StorefrontAccountTopUp

Composes the controlled balance top-up section from explicit title/quick-label/presets, amount and payment descriptors, and demo text. Preserves heading/input/completion IDs, quick-amount pressed state and callbacks, LTR input props (the amount descriptor’s `inputMode`, `numeric` by default, so a currency with decimals gets a decimal keyboard), pending disabled/loading button, status roles, completion focus target and section classes. Adds no wrapper.

View retains tab visibility, descriptor mapping and preset normalization; StorefrontAccountBalancePanel retains checkout-return/history composition. Account/shared logic retains amount parsing/limits, validation/focus, pending timer, customer scope, wallet changes, storage failures, analytics and persistence. No state, effects, browser APIs or payment rules belong here.

Verify bilingual empty/invalid amounts, quick selection, localized input, pending/repeat submission, completion and storage-error retry, persisted balance/history, checkout return, touch/keyboard use, rotation, overflow and accessibility against the previous version.

Isolated fixture/spec coverage exercises bilingual preset/manual amount callbacks, numeric/decimal keyboard descriptors, error/hint mapping, pending activation suppression, independent processing/completion status, completion focus target, axe and compact containment. Amount rules, payment scheduling and wallet persistence stay in page integration coverage.
