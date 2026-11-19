# StorefrontBagDeliveryIntro

Composes ErrorSummary and the controlled guest sign-in prompt from explicit errors and sign-in visibility/prompt/label/href/callback. Preserves fragment order, `vf-errors` ID, prompt classes, link semantics and button styling/icon. Shared ErrorSummary owns accessible heading/list and target-focus behavior.

View retains delivery-step visibility and descriptor mapping. Bag/shared logic retains problems/validation state, guest eligibility, continuation URLs/callbacks, authentication and private draft/customer isolation. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual guest/signed-in visibility, sign-in link/return and draft continuity, initial absence of errors, summary counts and all target links/focus, updated errors, touch/tablet rotation, keyboard activation, overflow and accessibility. Compare prompt/summary regions with the unchanged baseline.
