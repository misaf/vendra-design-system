# StorefrontCheckoutDeliveryReview

Composes the labelled delivery-review section, Card, heading/edit link and DetailList from explicit labels, edit href/callback and rows. Preserves section/heading ID, classes/order, card padding and edit button styles/icon/link semantics.

View retains payment visibility and mapping. Checkout/shared logic retains delivery values/localized row formatting, edit/return navigation, draft persistence and payment/order behavior. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual delivery details, edit href/focus/target size, return to delivery and updated review, unchanged schedule/totals/payment drafts, reload, touch/tablet rotation, TV keyboard activation, overflow and accessibility. Compare review regions with the unchanged baseline.

`StorefrontCheckoutDeliveryReview.spec.mjs` covers the named section/heading target, ordered supplied detail rows and updates, LTR phone content, edit href and keyboard callback/event forwarding in English and Persian. Axe scans cover initial/updated and compact review, with an overflow check. Draft persistence and edit/return navigation remain page-level tests. Run with `npm run test:e2e:dev --workspace apps/storefront -- --project=storefront-components StorefrontCheckoutDeliveryReview`. Remaining coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
