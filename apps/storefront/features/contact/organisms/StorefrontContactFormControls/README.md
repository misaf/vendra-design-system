# StorefrontContactFormControls

Composes the contact error summary, controlled name/mobile/email/message fields and send action from explicit problems, field descriptors and send (label, onClick, busy). Preserves field/summary IDs, autocomplete, email type/direction, required multiline message, hint/error wiring, field order, wrapper classes and primary large send button with loading/disabled state.

View retains not-sent visibility and localized descriptor/callback mapping, form heading and completion/feedback composition. Contact/shared logic retain signed-in prefill, reply-channel/message validation, API submission, busy/errors, draft retention and focus. Package field/ErrorSummary/Button components retain control semantics. StorefrontContactLayout retains form placement and columns. This organism owns no state, calculations, persistence or browser effects.

`StorefrontContactFormControls.spec.mjs` covers English/Persian labels and field metadata, supplied value updates without callbacks, isolated controlled editing and phone metadata, keyboard field/action order, summary links/focus, supplied errors and clearing, busy activation suppression/recovery, compact containment and axe in empty/filled/error/busy states.

Guest/customer prefill decisions, reply-channel/message validation, API outcomes, draft retention and page-managed focus remain integration responsibilities. The fixture supplies errors and busy state; it does not implement submission rules.
