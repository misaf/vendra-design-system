# StorefrontPostRelated

Composes the article related-story SectionHeader and responsive grid from explicit title/accent/stories props. Preserves ordered keyed soft 4/3 BlogCards, title/image/excerpt/meta/href props, grid classes and sibling structure without adding a wrapper.

View retains localized heading mapping and story-list normalization. Post logic retains current-article exclusion, selection/order, localized story metadata, image resolution and URLs. StorefrontPostLayout retains related section placement and article visibility; SectionHeader/BlogCard retain heading, image and link presentation. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual heading/card copy/order, current-article exclusion, image alt/sizes/loading, soft frames, real article hrefs, touch/keyboard navigation, heading focus, history/reload, loading/missing absence, tablet rotation, responsive containment, accessibility and screenshots against the previous version.
