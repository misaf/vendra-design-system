# StorefrontJournalSearch

Composes the journal controlled SearchField from explicit label/value/onChange props without adding a wrapper. Preserves the package field's labels, clear control and keyboard behavior.

View retains localized label/value/callback mapping. Journal logic retains query/category state, matching, page resets and navigation. SearchField retains input focus, clear/Escape behavior and accessibility; StorefrontJournalLayout retains search placement and spacing. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual labels, typing and matching, clear/Escape, empty recovery, category interaction, later-page reset, focus, responsive containment, accessibility and screenshots against the previous version.
