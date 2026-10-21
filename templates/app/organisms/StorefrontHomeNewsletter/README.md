# StorefrontHomeNewsletter

Controlled home newsletter organism receiving explicit open/done state, completion text, draft value, error, pending state, localized labels and change/submit callbacks. Composes associated heading/description, labelled email form, pending submit button and focusable status. View maps these props; home/shared logic retains profile prefill, validation, draft/error state, request deduplication, API submission, tracking, persistence and focus. Layout retains optional visibility, wrapper and band.

Preserve heading/field/label/status IDs, form noValidate, email type/LTR/autocomplete, error wiring, button height/pending wording and completion tabindex/role. No page model, state, effects or API imports live here. Verify bilingual initial/invalid/pending/failure/completion states, failure retry/draft retention, duplicate prevention, completion reload persistence, profile prefill, feature hiding, touch/TV input, rotation and accessibility.

Known pre-existing shared-control issue: after a pending submit button unmounts on completion, React Aria's global assertive log can retain role=img nodes labelled by the removed button. The newsletter itself passes scoped completion accessibility checks; whole-page completion needs the shared announcement follow-up recorded in ATOMIC-DESIGN.md.
