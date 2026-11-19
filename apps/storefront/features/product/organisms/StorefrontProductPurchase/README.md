# StorefrontProductPurchase

Controlled purchase organism receiving explicit summary labels/total/hint, quantity value/max/labels/change callback, save label/active/click callback and add label/disabled/click callback. Composes the live selection total, quantity input, saved-design action and responsive primary purchase action.

View maps product data and callbacks; product/shared logic retains quantity and URL state, reload persistence, saved state, totals, stock limits, bag mutations and confirmation. The sticky purchase action remains in the Shell slot. Preserve fragments, order, classes, status semantics, quantity minimum, responsive visibility and individual callbacks. No page model, state, effects or product rules live here.

Verify English/Persian totals, quantity minimum/maximum and URL/reload, save/unsave, matching configured bag confirmation, stock exhaustion/unavailable actions, touch/keyboard input, tablet rotation and accessibility. Bag rows retain quantity/remove controls; size/add-on editing stays on the product page.

`StorefrontProductPurchase.spec.mjs` covers controlled quantity bounds, supplied totals/status, save/unsave and add callbacks, availability gating and compact visibility in English and Persian, with axe on available/unavailable and compact states. The fixture supplies sample totals; pricing and bag persistence remain in page logic. Run with `npm run test:e2e:dev --workspace apps/storefront -- --project=storefront-components StorefrontProductPurchase`. Remaining organism coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
