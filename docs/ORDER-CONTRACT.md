# Laravel order contract for the florist pilot

[#365](https://github.com/misaf/vendra-design-system/issues/365) uses the [API alignment notes](./API.md) and [pilot audit](./PILOT-AUDIT.md) as its starting point. The contract below was checked against [Laravel at `650c974`](https://github.com/misaf/vendra/tree/650c97403052b87a5fec7227a3a1f7183cfa5909) using its local HTTP feature tests with in-memory SQLite. Staging deployment, Laravel team sign-off and the florist's launch payment method still need confirmation.

## Order trace and backend changes

| Step | Available in the audited Laravel revision | Required for the pilot |
| --- | --- | --- |
| Configure a product | `GET /api/catalog/products?token=…` finds the exact `Product.token`. A seeded cart line's `metadata.token` and comma-separated `metadata.addons` survived into the created order line. Checkout priced the underlying product and quantity from Laravel's catalog. [Product resource](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/packages/vendra-product-api/src/ApiResource/ProductResource.php), [checkout line pricing](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/packages/vendra-order-api/src/State/PlaceOrderProcessor.php#L134-L167) | Agree which catalog options represent size and add-ons. Cart writes must validate the selection and checkout must price it on the server. The test seeded metadata directly and confirmed transport only. [API alignment B4 and B8](./API.md#cart-and-checkout), [live catalog #250](https://github.com/misaf/vendra-design-system/issues/250) |
| Open a server cart | `GET /api/sales/carts` and `GET /api/sales/carts/{id}` require Sanctum and scope results to the customer. Laravel issues the token internally. Checkout requires a nonempty, unexpired cart the customer owns. [Cart resource](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/packages/vendra-cart-api/src/ApiResource/CartResource.php) | Expose cart creation and add/update/delete line operations with server totals and expiry. Confirm how the storefront gets a customer session and persists the cart across refresh and language changes. [API alignment B1 and B11](./API.md#cart-and-checkout), [pilot flow #367](https://github.com/misaf/vendra-design-system/issues/367) |
| Quote and schedule delivery | `POST /api/delivery/quotes` returns zone, distance, fee, currency and a manual-quote flag. `GET /api/delivery/schedule` returns dates and active slots. The quote's `id: "current"` has no expiry and checkout takes no quote reference. Checkout rejected a past date with `422`, then accepted a valid date with a new fee of 2,000 after a quote of 1,500. [Quote processor](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/packages/vendra-delivery-api/src/State/QuoteDeliveryProcessor.php), [delivery checkout rules](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/packages/vendra-order-api/src/State/PlaceOrderProcessor.php#L65-L100) | Bind the reviewed quote to checkout and agree on a machine-readable changed/expired response. Check the fee and selected slot together before any order or inventory write, using the store's timezone. An expired quote cannot be exercised until Laravel issues an expiring reference. [API alignment B2, B5 and B6](./API.md#delivery), [pilot flow #367](https://github.com/misaf/vendra-design-system/issues/367) |
| Submit or recover checkout | Authenticated `POST /api/sales/checkout` returned `201` with an order number and totals, placed one order and deducted two units of stock. Repeating the same payload and `Idempotency-Key` after consuming the cart returned `422` on `cartToken` without the order number. [Checkout resource](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/packages/vendra-order-api/src/ApiResource/CheckoutResource.php), [checkout processor](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/packages/vendra-order-api/src/State/PlaceOrderProcessor.php) | Persist the checkout key and result atomically, scoped to tenant and customer/session. Replay the existing order before checking the consumed cart. Cover a lost response, a concurrent retry and a changed payload under the same key. [API alignment B37](./API.md#repeated-requests), [pilot flow #367](https://github.com/misaf/vendra-design-system/issues/367) |
| Confirm payment | Checkout can associate an active transaction gateway slug and save a payment reference. The order response exposes an order status such as `pending`. The audited checkout and order operations expose neither a payment state nor a storefront gateway redirect or callback. [Gateway selection](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/packages/vendra-order-api/src/State/PlaceOrderProcessor.php#L203-L218), [order resource](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/packages/vendra-order-api/src/ApiResource/OrderResource.php) | Confirm the method with the florist. For manual transfer or pay-on-delivery, agree on the authorized payment status and who records confirmation. For an online gateway, require a backend redirect payload, repeat-safe provider verification, authorized payment status and a return to `/<lang>/checkout/?payment=return&order=<number>`. Rehearse pending and failed outcomes for the chosen method. [API alignment B30](./API.md#not-built-yet-no-data), [pilot cutover #371](https://github.com/misaf/vendra-design-system/issues/371) |
| Track the order | `GET /api/sales/orders/{id}` returned `200` for the customer and `404` for another customer. Existing tests also cover unauthenticated access and the customer-scoped order list. Order detail takes Laravel's internal numeric ID. [Order resource](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/packages/vendra-order-api/src/ApiResource/OrderResource.php), [owner scope](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/packages/vendra-order-api/src/State/OrderLinksHandler.php) | Expose an authorized lookup by customer-facing order number for tracking and a payment return in a fresh browser context. Confirm whether guest lookup is in scope and define its verification and response fields if so. [API alignment B16 and B17](./API.md#orders), [pilot flow #367](https://github.com/misaf/vendra-design-system/issues/367) |

Laravel owns pricing, inventory, delivery availability, order creation and access, payment verification, and wallet balances. The storefront collects selections and presents Laravel's results. [Cross-repository ownership #234](https://github.com/misaf/vendra-design-system/issues/234)

## Adapter and verification

`src/platform/server/laravel/` provides typed transport and JSON-LD adapters for exact product lookup, cart detail, delivery quote and schedule, checkout and order detail. Monetary fields carry Laravel's amounts in the indicated currency's minor units. The server factory in [`src/platform/server/laravel/for-storefront.ts`](../src/platform/server/laravel/for-storefront.ts) takes a resolved tenant origin, locale and optional customer-scoped access token per request. It sends the configured storefront origin for Laravel's [tenant resolution](https://github.com/misaf/vendra/blob/650c97403052b87a5fec7227a3a1f7183cfa5909/app/Http/Middleware/ResolveApiTenant.php). Issuing the session and using the adapter in the customer flow are part of the pilot integration. Update that integration after agreeing on the contracts above.

To regenerate the wire types, run `php artisan api:openapi:export` in the pinned Laravel checkout and save the JSON output. Then run the following from this repository, substituting the export path and full commit SHA.

```sh
node tools/build/generate-vendra-api-types.mjs /path/to/laravel-openapi.json 650c97403052b87a5fec7227a3a1f7183cfa5909 > src/platform/server/laravel/openapi.generated.d.ts
```

The export describes the POST inputs as their responses. Local HTTP traces establish that delivery returns `QuotedDelivery` and checkout returns `Order`. The quote adapter checks its observed fields at runtime. The checkout adapter decodes the same order shape as authenticated order detail. See [#162](https://github.com/misaf/vendra-design-system/issues/162) for published schema provenance and drift checking.

The [contract tests](../tests/laravel-order-contract.test.mjs) use trimmed, anonymized responses from the local order trace. They exercise the adapter's requests, server amounts, selected metadata, validation errors, replay behavior and customer access. The 42 existing Laravel catalog, cart, delivery and order tests also passed at the pinned revision. Pilot acceptance still requires a Laravel-backed trace with server-issued carts, quote expiry, successful checkout replay, and payment confirmation for the selected method.

## Lost-response checkout replay

[#439](https://github.com/misaf/vendra-design-system/issues/439) repeated the checkout probe against
[Laravel `c1fb736`](https://github.com/misaf/vendra/tree/c1fb73611c196dcf0e814e0616e74e7e958a1515)
with PHP 8.4, Laravel 13.43.0, and an isolated in-memory SQLite database. The test used the Laravel
HTTP kernel and discarded the first response after the endpoint committed a `201` order.

The same tenant and customer retried with the original payload and `Idempotency-Key`. Laravel
returned `422` on `cartToken` without an order number. The database still held one order for the
cart, and stock stayed at eight after the first checkout removed two units. The consumed-cart
check prevented the retry from reaching a successful response.
[Backend replay fix](https://github.com/misaf/vendra/issues/90)

### Repeat the acceptance test

In a disposable Laravel checkout at the revision above, append this case to
`packages/vendra-order-api/tests/Feature/CustomerOrderApiTest.php`. It uses that file's existing
tenant setup and product factory helper.

```php
it('probes checkout replay after a discarded response', function (): void {
    expect(DB::connection()->getDatabaseName())->toBe(':memory:');

    $user = createTestUser();
    $product = orderApiProduct(price: 4800, quantity: 10);
    $cart = CartFactory::new()->forOwner($user)->createOne();
    CartItemFactory::new()->forCart($cart)->forSellable($product)->createOne(['quantity' => 2]);
    $payload = ['cartToken' => $cart->token, 'currencyCode' => 'USD'];
    $headers = ['Idempotency-Key' => 'f47e2fdf-0171-404e-a34a-0899d85d3e3f'];

    // Release RefreshDatabase's transaction so checkout commits on its own.
    DB::commit();
    $this->actingAs($user)->postJson('/api/sales/checkout', $payload, $headers)->assertCreated();

    expect(DB::transactionLevel())->toBe(0);
    $orders = Order::query()->where('cart_id', $cart->getKey());
    $order = $orders->sole();

    $retry = $this->postJson('/api/sales/checkout', $payload, $headers);

    expect($orders->count())->toBe(1);
    expect($orders->sole()->number)->toBe($order->number);
    expect($product->refresh()->quantity)->toBe(8);
    $retry->assertSuccessful()->assertJsonPath('number', $order->number);
});
```

Run from the Laravel repository root with its locked Composer dependencies installed.

```sh
APP_ENV=testing DB_CONNECTION=sqlite DB_DATABASE=:memory: DB_URL= \
  APP_KEY="base64:$(php -r 'echo base64_encode(random_bytes(32));')" \
  php artisan test --compact packages/vendra-order-api/tests/Feature/CustomerOrderApiTest.php \
  --filter='probes checkout replay'
```

The test currently fails at the successful replay assertion with `422`. Rerun it when the backend
fix lands, then use the verified response in the storefront recovery tests before shipping
[#435](https://github.com/misaf/vendra-design-system/issues/435).
