# StorefrontAccountProfile

Composes controlled profile fields from explicit problems, name/phone/email/language/SMS and save descriptors. Preserves wrapper classes, summary/field IDs, name autocomplete, disabled LTR phone/hint, email type/direction/error/hint, language options/hint, SMS switch and primary save action. Adds no wrapper.

View retains profile-tab visibility and descriptor mapping. Account/shared logic retains customer identity/scope, drafts and changed-field tracking, email validation/focus, merging against newer account data, save errors/notices, locale switching and persistence. No state, effects, browser APIs or profile rules belong here.

Verify bilingual field semantics, invalid-email summary/focus, drafts, SMS/language selection, storage-error retry, persisted profile values, preservation of newer wallet/account data, reload/tab continuity, customer isolation, touch/keyboard use, rotation, overflow and accessibility against the previous version.
