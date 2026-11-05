# StorefrontAccountEditorDialog

Composes the controlled shared address/reminder dialog from open/title/close, storage error, problems, save/cancel labels/actions and children. Preserves Dialog props, flex/gap wrappers, conditional danger alert, error-summary ID, field position and save/ghost-cancel actions. Adds no wrapper around the supplied fields.

View retains field-branch selection and descriptor mapping. Account/shared logic retains drafts, validation, summary/field focus, save/error state, customer scope, mutations and persistence. Package Dialog retains portal, dismissal, focus containment and opener restoration. No state, effects, browser APIs or account rules belong here.

Verify bilingual address/reminder entry, validation summaries and focus, storage-error retry, save/cancel/Escape/close dismissal, draft reset, opener restoration, persisted edits, touch/keyboard use, rotation, overflow and accessibility against the previous version.
