# StorefrontErrorActions

Composes error-page recovery controls from explicit retryLabel/onRetry, homeLabel/homeHref and phoneLabel/phoneHref props. Preserves the primary rotate retry button, secondary home link and ghost phone link, in order, without adding a wrapper.

View retains localized label, callback and URL mapping. Error logic retains reload behavior and bidi-isolated phone wording; shared logic retains routing, locale and focus. StorefrontErrorLayout retains action placement and wrapping. This organism owns no state, calculations, persistence or browser effects. The lazy-page load-failure boundary remains a separate shared recovery mechanism.

Verify retry via touch and Enter/Space, real document reload, localized home recovery, native phone target and exact wording, bilingual accessibility, client-navigation focus, back/reload, tablet rotation, containment and screenshots against the previous version. Do not invoke the phone handler during verification.
