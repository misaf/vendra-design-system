# StorefrontWeddingsCompletion

Composes the weddings success region, success Alert and secondary return-to-form action from explicit title/body/edit props. Preserves vf-weddings-success, tabindex, named-region semantics, classes and sibling structure without adding a wrapper.

View retains completion visibility and localized demo/live copy mapping. Weddings/shared logic retain submission outcomes, busy/errors, retained drafts, edit transitions and focus. StorefrontWeddingsLayout retains inquiry placement. This organism owns no state, calculations, persistence or browser effects.

`StorefrontWeddingsCompletion.spec.mjs` covers English/Persian supplied content updates, stable named region/focus target, pointer/Enter/Space edit callbacks, owner-controlled visibility, compact containment and axe with alternate completion wording.

Submission outcomes, demo/live wording decisions, retained drafts and return-to-name focus remain page-level integration responsibilities.
