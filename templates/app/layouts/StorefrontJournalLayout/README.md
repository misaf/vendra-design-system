# StorefrontJournalLayout

Journal Atomic Design template with React-node slots for heading, search, feedback, featured story, stories and pagination. It owns the main focus target, header/search wrappers and responsive article grid.

StorefrontJournalHeading composes the title and category controls from explicit props. StorefrontJournalSearch composes the controlled search field from explicit props. StorefrontJournalEmpty composes no-result feedback and recovery. StorefrontJournalLoading composes the decorative skeleton and localized status. StorefrontJournalFeatured composes the wide arch featured BlogCard from explicit props. The View retains visibility and localized/story/value/callback mapping, category list normalization and focus scrolling, article cards and pagination controls. Journal logic retains category/query state, matching, page clamping, first-page resets, URL navigation, story mapping and localized metadata. Shared page logic retains locale, SEO and focus. This layout owns no data, state, effects, callbacks or visibility rules.

Preserve classes, card order, landmarks and focus targets. Verify filtering/search/clear, empty/loading states, page links/reloads, category reset from later pages, article navigation, English/Persian accessibility and responsive rendering.
