# StorefrontContactFormControls

Composes the contact error summary, controlled name/mobile/email/message fields and send action from explicit problems, field descriptors and send (label, onClick, busy). Preserves field/summary IDs, autocomplete, email type/direction, required multiline message, hint/error wiring, field order, wrapper classes and primary large send button with loading/disabled state.

View retains not-sent visibility and localized descriptor/callback mapping, form heading and completion/feedback composition. Contact/shared logic retain signed-in prefill, reply-channel/message validation, API submission, busy/errors, draft retention and focus. Package field/ErrorSummary/Button components retain control semantics. StorefrontContactLayout retains form placement and columns. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual labels, guest/customer prefill, summary links and single-field focus, email/mobile reply alternatives, demo completion and return-to-form drafts, pending/failed submission recovery and responsive markup against the previous version.
