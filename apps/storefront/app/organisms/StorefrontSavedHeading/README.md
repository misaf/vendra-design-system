# StorefrontSavedHeading

Composes the saved-page heading from explicit eyebrow/title/accent props using package SectionHeader at h1 level. Preserves the count eyebrow, accented title and package markup without adding a wrapper.

View retains localized prop mapping; saved/shared logic retain list membership, count wording and locale formatting, removal/Undo, persistence and focus. Package SectionHeader retains heading/accent semantics. StorefrontSavedLayout retains the heading wrapper. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual zero/one/multiple counts, one page h1, remove/Undo count updates, reload persistence and responsive markup against the previous version.
