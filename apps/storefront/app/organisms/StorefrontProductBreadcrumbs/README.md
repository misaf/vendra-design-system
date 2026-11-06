# StorefrontProductBreadcrumbs

Composes product breadcrumbs through the package Breadcrumb from explicit label/items props. Preserves navigation labeling, ordered shop/category/current-product items and the existing bottom spacing class without adding a wrapper. Breadcrumb retains native link/current-page semantics and decorative separators.

View retains localized label/item mapping. Product/shared logic retains product identity, category and shop URLs, locale, routing and focus. StorefrontProductLayout retains slot placement. Product View retains its recently viewed reset boundary and toast queue. This organism owns no state, persistence, business rules or browser effects.

Verify bilingual navigation label and item order, product-code direction, current-page semantics, shop/category native hrefs and touch/Enter activation, locale/history/reload, client-navigation focus, tablet rotation, containment, accessibility and screenshots against the previous version.
