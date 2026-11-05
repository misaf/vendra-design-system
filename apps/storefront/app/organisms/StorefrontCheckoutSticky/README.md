# StorefrontCheckoutSticky

Composes the live total and primary place action from explicit summary/place descriptors inside Shell's sticky slot. Preserves vf-mobile-action/total/caption/price classes, Price size and button variant/icon/loading/disabled props.

View/logic retain visibility, totals, method-specific wording, validation, amount confirmation, submission and pending/error state. Shell/StorefrontBottomBar retain responsive docking, measurements and focus behavior. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual total/method updates, invalid-receipt focus, changed-amount blocking, pending duplicate prevention, failure/retry, completion hiding, touch/tablet rotation, keyboard activation, overflow and accessibility. Compare the visible phone action with the unchanged baseline.
