# StorefrontNotfoundProducts

Composes ordered not-found product cards from explicit products/photoLabel/saveLabel props. Preserves keyed soft-frame ProductCards with images/name/subtitle/price/stock/href and placeholder/favorite labels, without adding a wrapper.

View retains list normalization and localized label mapping. Not-found logic retains product selection/order, fixed product-code names, category/price/stock/image descriptors and URLs. StorefrontNotfoundLayout retains section placement and the responsive grid; ProductCard retains presentation, stock, image and link semantics. This organism owns no state, calculations, persistence or browser effects.

Verify source product order/codes/category/prices/stock/images/hrefs, soft frames, lazy images, bilingual labels, direct/invalid-route entry, touch/keyboard product and recovery navigation, heading focus, history/reload, tablet rotation, responsive containment, accessibility and screenshots against the previous stage.
