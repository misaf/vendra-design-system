# StorefrontWeddingsFormControls

Composes the weddings inquiry Card, validation summary, name/email/phone fields, event selector, guest count, date picker, budget selector, message and send action from explicit problems and field/action descriptors. Preserves field order, stable IDs, required name/phone, autocomplete, email type/direction, numeric guest input mode, date language/minimum, select options, four-row message hint and busy loading/disabled behavior. Adds no DOM wrapper.

View retains localized descriptor mapping and form/completion visibility. Weddings/shared logic retain field values and callbacks, date constraints, validation, request payloads, API/busy/error/completion state, drafts, navigation and focus. StorefrontWeddingsLayout retains inquiry placement. This organism owns no state, validation, calculations, persistence or browser effects.

`StorefrontWeddingsFormControls.spec.mjs` covers English/Persian field metadata and external values, controlled edits and phone metadata, event/budget callbacks, supplied date language/minimum and calendar selection, summary links/focus and error clearing, busy activation suppression/recovery, compact containment and axe on meaningful states.

Prefill, date/validation rules, request payload decisions, API outcomes, drafts and page-managed completion/edit focus remain integration responsibilities. Fixtures supply state and callbacks without implementing submission rules.
