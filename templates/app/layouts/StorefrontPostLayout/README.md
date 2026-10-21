# StorefrontPostLayout

Post Atomic Design template with React-node slots for feedback, article, actions, recommendations and related stories. It owns the main focus target, reading-width wrapper, article/actions wrappers and recommendation/related sections. `showArticle` is externally controlled visibility.

The View retains loading/missing feedback, back link, article heading/metadata, block/classic content, copy/shop actions, social links, product cards and related-story cards. Post logic retains article selection, block/product/related mapping, localized metadata, share URLs, copy state and timer cleanup. Shared logic retains routing, locale, SEO and focus. The layout owns no data, state, effects or callbacks and does not choose the page state.

Preserve classes, article/section order and focus targets. Verify classic/block content, loading/missing recovery, copy feedback, back/shop/product/related links, social-link attributes, bilingual accessibility and responsive rendering.
