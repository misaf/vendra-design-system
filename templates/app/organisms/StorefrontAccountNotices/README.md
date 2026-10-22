# StorefrontAccountNotices

Composes the account page storage-error alert from an explicit save error. Preserves the danger tone and title without adding a wrapper.

View retains the `saveError && !formOpen` visibility condition and notices-slot placement before the tabs. Account/shared logic retains localized errors, storage mutations and retry/clearing behavior. StorefrontAccountEditorDialog retains editor error alerts; package Alert retains alert semantics and presentation. No state, effects, browser APIs or persistence rules belong here.

Verify initial absence, bilingual profile-save failure, retained drafts, successful retry, page/editor alert separation, editor close/retry transitions, responsive containment and accessibility against the previous version.
