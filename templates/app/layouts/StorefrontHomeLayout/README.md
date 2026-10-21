# StorefrontHomeLayout

Home Atomic Design template with React-node slots for top/categories, featured designs, occasions, arrivals, weddings, journal and newsletter. It owns the main focus target, ordered section wrappers, static section labels, spacing and featured/wedding/newsletter bands. Optional sections receive externally controlled visibility flags.

StorefrontHomeCategories composes the top heading/category carousel from explicit props. StorefrontHomeFeatured composes featured cards and responsive view-all links. StorefrontHomeOccasions composes the occasion heading, description and carousel. The View retains category/featured/occasion data and label mapping and the other headings, collection carousels, navigation controls, cards, favorite callbacks, wedding actions and newsletter form/feedback. Home logic retains collection ordering, product identity/mapping, feature availability, newsletter validation/submission/persistence and focus. Shared logic retains navigation, locale, SEO and carousel behavior. The layout owns no data, state, effects or callbacks and does not choose feature availability.

Preserve section order, classes, labelled-by targets and focus targets. Verify collection navigation, ready/occasion filters, favorites, wedding/contact/journal links, newsletter validation/success/failure/retry, bilingual accessibility and responsive carousel behavior.
