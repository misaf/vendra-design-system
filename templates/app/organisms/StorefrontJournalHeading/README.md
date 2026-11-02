# StorefrontJournalHeading

Composes the journal SectionHeader and labelled category Chip group from explicit eyebrow/title/accent, categoriesLabel/categories and onCategoryFocus props. Preserves h1, keyed chips, selection/aria-pressed, callbacks and classes without adding a wrapper.

View retains localized mapping, category list normalization and focus-scroll behavior. Journal logic retains category/query state, matching, selection callbacks, page resets and navigation. StorefrontJournalLayout retains header placement; shared logic retains locale, SEO and page focus. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual heading/category copy, touch and keyboard selection, compact horizontal focus scrolling, search/clear, empty states, category reset from later pages, article navigation, responsive containment, accessibility and screenshots against the previous version.
