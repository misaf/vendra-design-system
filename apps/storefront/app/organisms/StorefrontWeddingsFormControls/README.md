# StorefrontWeddingsFormControls

Composes the weddings inquiry Card, validation summary, name/email/phone fields, event selector, guest count, date picker, budget selector, message and send action from explicit problems and field/action descriptors. Preserves field order, stable IDs, required name/phone, autocomplete, email type/direction, numeric guest input mode, date language/minimum, select options, four-row message hint and busy loading/disabled behavior. Adds no DOM wrapper.

View retains localized descriptor mapping and form/completion visibility. Weddings/shared logic retain field values and callbacks, date constraints, validation, request payloads, API/busy/error/completion state, drafts, navigation and focus. StorefrontWeddingsLayout retains inquiry placement. This organism owns no state, validation, calculations, persistence or browser effects.

Verify bilingual summary links and field focus, select/date interaction, complete payloads, pending activation guards, failed-send retry, completion/edit draft retention, responsive containment, accessibility and screenshots against the previous version.
