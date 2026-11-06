# StorefrontContactFormHeading

Composes the contact form’s level-two heading from an explicit title prop without adding a wrapper. It stays present while the form, completion and edit states change.

View retains localized copy mapping and places this heading outside the form/completion visibility branches. Contact logic retains validation, draft values, submission, busy/error state and focus; StorefrontContactLayout retains form-column placement. This organism owns no state, persistence or browser effects.

Verify bilingual copy and heading hierarchy, validation focus, completion focus, return-to-form draft/focus retention, heading DOM identity across transitions, tablet rotation, containment, accessibility and screenshots against the previous version.
