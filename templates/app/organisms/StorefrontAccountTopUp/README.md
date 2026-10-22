# StorefrontAccountTopUp

Composes the controlled balance top-up section from explicit title/quick-label/presets, amount and payment descriptors, and demo text. Preserves heading/input/completion IDs, quick-amount pressed state and callbacks, numeric LTR input props, pending disabled/loading button, status roles, completion focus target and section classes. Adds no wrapper.

View retains tab visibility, descriptor mapping and preset normalization; StorefrontAccountBalancePanel retains checkout-return/history composition. Account/shared logic retains amount parsing/limits, validation/focus, pending timer, customer scope, wallet changes, storage failures, analytics and persistence. No state, effects, browser APIs or payment rules belong here.

Verify bilingual empty/invalid amounts, quick selection, localized input, pending/repeat submission, completion and storage-error retry, persisted balance/history, checkout return, touch/keyboard use, rotation, overflow and accessibility against the previous version.
