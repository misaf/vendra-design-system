# StorefrontCheckoutSubmission

Composes the optional WhatsApp handoff, processing status, failure/retry/other-method feedback, safety notice and wide place/back actions from explicit descriptors. Preserves fragment order, link target/rel, status role, alert tones/icons, responsive classes, button variants/sizes/icons, loading and disabled props. The compact submission action remains in Shell's separate sticky slot.

View retains descriptor mapping and payment visibility. Checkout/shared logic retains readiness and receipt checks, submission/deduplication, pending/error state, retry/method selection, WhatsApp URLs/validation, navigation, gateway handling and persistence. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual card validation and completion, pending duplicate prevention, failure/retry/other-method callbacks, WhatsApp link semantics and readiness guard, back navigation and receipt continuity, touch/tablet rotation, keyboard activation, overflow and accessibility. Compare idle, WhatsApp, pending and failure regions with the unchanged baseline.
