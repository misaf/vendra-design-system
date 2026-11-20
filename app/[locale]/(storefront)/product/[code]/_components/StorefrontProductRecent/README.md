# StorefrontProductRecent

Recently viewed product organism receiving normalized product records, localized heading/count/region/navigation/photo/save labels and an explicit carousel reset key. Composes SectionHeader, CollectionCarousel and ProductCards with the existing one-card/multiple-card image sizing.

Product View retains visibility, normalization/count formatting and the product-keyed ErrorBoundary. Product/shared logic retains browser history persistence, current-product exclusion, deduplication, ordering/limit, product/price/stock/image/link mapping and favorite state/callbacks. The carousel keeps measured overflow/navigation behavior and resets on product changes. Preserve the section/classes, card order, responsive sizes, four-card layout, compact peek, labels and callbacks. No page model, state/effects, persistence or product rules move here.

Verify English/Persian single/multiple cards, absent/corrupt history, legacy IDs, exclusion/deduplication/order, carousel touch/keyboard navigation, favorite toggles, product links/reset, tablet rotation, no document overflow and accessibility.

The colocated fixture/spec covers supplied heading/count/card order, destinations/images/placeholder/stock, one/many image sizes, isolated favorite/select callbacks and controlled favorite updates, compact carousel navigation/reset, single/empty input, bilingual axe and containment. It does not read browsing history. History validation, exclusion/deduplication/ordering, price/stock mapping, persistence and route transitions remain page integration responsibilities; package Carousel tests cover detailed scrolling mechanics.

The keyboard select test also guards ProductCard link cancellation: an owner callback can prevent navigation before Enter activates the native link, just as with pointer activation.
