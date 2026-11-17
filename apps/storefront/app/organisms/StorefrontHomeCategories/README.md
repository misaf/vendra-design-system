# StorefrontHomeCategories

Colocated fixtures/specs cover supplied content and replacement props, native pointer/keyboard destinations, responsive RTL/LTR carousel navigation, single/empty collections and English/Persian axe checks. Fixtures use local images and hash destinations; page-level filtering, routing and persistence remain integration responsibilities.

Home category-navigation organism with explicit category records and localized heading, region, count and previous/next labels. Composes the home h1 and shared CollectionCarousel with circular CategoryCards. View normalizes category data and formats the count; home logic retains category order, images, localized names and filter URLs. It receives no page model and owns no state or browser effects.

Preserve heading level, fragments/order, classes, responsive sizing, spacing, image sizes and navigation labels. Carousel measurement, scroll state, resizing and RTL navigation remain in the existing shared carousel. Verify bilingual initial/scrolled layouts, counts/order, previous/next states, category filter navigation, touch activation, TV keyboard activation, rotation and accessibility.
