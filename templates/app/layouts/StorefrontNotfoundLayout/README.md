# StorefrontNotfoundLayout

Not-found Atomic Design template with React-node slots for message, recovery actions, recommendation heading and recommendations. It owns the main focus target, centered message/actions wrappers, recommendation section and responsive product grid.

StorefrontNotfoundMessage composes the flower EmptyState, localized 404 eyebrow, h1/accent and body from explicit props. StorefrontNotfoundActions composes the home/search links from explicit labels/hrefs. StorefrontNotfoundRecommendationHeading composes the localized level-two SectionHeader from explicit title/accent props. The View retains localized message/action/heading mapping and product cards. Not-found logic retains product selection/order, product-code identity, image/price/stock mapping and links; shared logic retains invalid-route handling, routing, locale, SEO and focus. The layout owns no data, state, effects or callbacks.

Preserve classes, landmarks, section order and focus targets. Verify direct and invalid-route entry, home/search recovery, recommendation navigation, product identity, bilingual accessibility and responsive rendering.
