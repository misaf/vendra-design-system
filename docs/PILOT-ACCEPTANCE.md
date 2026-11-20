# Bilingual purchase flow audit

This audit covers the Next.js storefront in [#367](https://github.com/misaf/vendra-design-system/issues/367). The production export tests use sample products and a local HTTP stub.

| Requirement | Current storefront | Live pilot acceptance |
| --- | --- | --- |
| Catalog and cart | Search uses `q`; shop filters and pagination are URL-backed. Product configuration travels in the product URL. The bag uses browser storage and survives route changes, reloads, and language switches. | Load the florist’s products and settings under [#250](https://github.com/misaf/vendra-design-system/issues/250). Verify the same Laravel-issued cart and configured lines across those transitions. Checkout currently sends an empty `cartToken`. |
| Price and delivery review | The bag reprices against the bundled catalog and calculates delivery from store rules. The export test changes the bag total and checks that checkout requires review. Delivery requires an explicit available slot and uses the store clock. | Show Laravel’s item and delivery totals before payment. If its quote changes or expires, show the replacement and require a new review before an order is created. |
| Submission and recovery | After a lost response, checkout displays an uncertain state and sends the same key and payload when retried without edits. The export test models an order committed before that response was lost. | Confirm replay returns the existing order for the same cart and submission key. Exercise this after a timeout and a reload against staging. |
| Payment and tracking | The export tests exercise a card-transfer order with a checkout stub and an online return with an order-status stub. The tracking screen can open the demo order in the same browser. | Confirm the florist’s payment method and verify pending and confirmed states against Laravel. Verify that tracking works from a second browser with authorized details. |

The [API alignment notes](./API.md) describe the cart, quote, checkout, tracking, and payment contracts. A live checkout also needs a real order number in the success response. The current client can fall back to a browser-generated number when the response omits it.

[PR #372](https://github.com/misaf/vendra-design-system/pull/372) reports two Laravel findings relevant to [#365](https://github.com/misaf/vendra-design-system/issues/365). A replay returned HTTP 422 after the initial request created an order, and an increased delivery fee was accepted at submission without renewed review. Both need fixed behavior and staging acceptance before this flow can qualify for the pilot.

Run the export tests locally with Node 22 and Playwright Chromium.

```sh
npm ci
npm run build:demo
npm run test:smoke:demo
```
