# StorefrontPostMissing

Composes missing-story feedback and the journal recovery link from explicit title/backLabel/journalHref props. Preserves the level-one EmptyState heading and package Button link as siblings without adding a wrapper.

View retains missing visibility and localized copy/link mapping. Post logic retains article selection, loading/missing state and content mapping; shared routing retains the localized journal URL and navigation/focus behavior. StorefrontPostLayout retains feedback placement and controlled article visibility. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual missing feedback, heading semantics, localized recovery hrefs, touch/keyboard activation, history/reload, loading/missing coexistence, normal-route recovery, responsive containment, accessibility and screenshots against the previous version.
