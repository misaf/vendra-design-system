import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import {lookupLiveProduct} from '../src/platform/server/laravel/catalog.mjs';
import {createVendraApi, VendraApiError} from '../src/platform/server/laravel/index.mjs';

const wire = JSON.parse(
  readFileSync(new URL('./fixtures/laravel-order-contract.json', import.meta.url))
);
const apiOrigin = 'https://api.example.test';
const pin = {latitude: 35.7219, longitude: 51.2334, currencyCode: 'USD'};
const checkoutInput = {
  ...pin,
  cartToken: wire.cart.token,
  deliveryDate: wire.schedule.dates[1],
  deliverySlotId: wire.schedule.slots[0].id
};
const submissionKey = 'f47e2fdf-0171-404e-a34a-0899d85d3e3f';

function withApi(handle) {
  return createVendraApi({
    apiOrigin,
    fetch: (url, init) => {
      assert.equal(url.origin, apiOrigin);
      assert.equal(init.headers.get('Accept'), 'application/ld+json');
      assert.equal(init.cache, 'no-store');
      assert.equal(init.redirect, 'error');
      assert.ok(init.signal instanceof AbortSignal);
      return handle(url, init);
    }
  });
}

test('uses the exact product code and reads selections carried in cart and order line metadata', async () => {
  const api = withApi(url => {
    if (url.pathname === '/api/catalog/products') {
      assert.equal(url.searchParams.get('token'), 'VF-7K2M4Q');
      // Laravel now emits unprefixed member/totalItems; older Hydra collections use a prefix.
      return Response.json({
        'hydra:member': wire.products.member,
        'hydra:totalItems': wire.products.totalItems
      });
    }
    assert.equal(url.pathname, '/api/sales/carts/1');
    return Response.json(wire.cart);
  });
  const product = await api.getProductByCode('VF-7K2M4Q');
  const cart = await api.getCart(1);
  assert.equal(product.code, 'VF-7K2M4Q');
  assert.equal(product.name.fa, 'رز قرمز');
  assert.equal(cart.lines[0].sellableId, product.id);
  assert.equal(cart.lines[0].productCode, product.code);
  assert.deepEqual(cart.lines[0].selectedAddOns, ['card', 'chocolate']);
});

test('reports the reviewed quote and Laravel schedule without treating "current" as a quote token', async () => {
  const api = withApi((url, init) => {
    if (url.pathname === '/api/delivery/schedule') return Response.json(wire.schedule);
    assert.equal(url.pathname, '/api/delivery/quotes');
    assert.equal(init.method, 'POST');
    assert.deepEqual(JSON.parse(init.body), pin);
    return Response.json(wire.quote);
  });
  assert.deepEqual(await api.quoteDelivery(pin), {
    zoneId: 1,
    distanceKm: 14.513,
    feeAmount: 1500,
    currencyCode: 'USD',
    requiresManualQuote: false
  });
  assert.deepEqual(await api.getDeliverySchedule(), {
    dates: wire.schedule.dates,
    slots: [{id: 1, name: {en: 'Afternoon'}, startsAt: '12:00:00', endsAt: '17:00:00'}]
  });
});

test('preserves the actual charged fee and sends the same key and payload on a caller-initiated replay', async () => {
  const submitted = [];
  const api = withApi((url, init) => {
    assert.equal(url.pathname, '/api/sales/checkout');
    assert.equal(init.method, 'POST');
    assert.equal(init.headers.get('Content-Type'), 'application/json');
    submitted.push([init.headers.get('Idempotency-Key'), JSON.parse(init.body)]);
    return submitted.length === 1
      ? Response.json(wire.checkout, {status: 201})
      : Response.json(wire.replay, {status: 422});
  });
  const order = await api.submitCheckout(checkoutInput, submissionKey);
  assert.equal(order.number, 'ORD-FLORIST01');
  // Current Laravel behavior from the local trace. Pilot checkout requires re-review instead.
  assert.equal(order.deliveryAmount, 2000);
  assert.equal(order.totalAmount, 11600);
  assert.equal(order.status, 'pending');
  assert.equal(order.lines[0].productCode, 'VF-7K2M4Q');
  assert.deepEqual(order.lines[0].selectedAddOns, ['card', 'chocolate']);
  await assert.rejects(
    api.submitCheckout(checkoutInput, submissionKey),
    error =>
      error instanceof VendraApiError &&
      error.kind === 'validation' &&
      error.status === 422 &&
      error.issues[0].field === 'cartToken'
  );
  assert.deepEqual(submitted, [
    [submissionKey, checkoutInput],
    [submissionKey, checkoutInput]
  ]);
});

test('passes through Laravel order authorization outcomes without leaking another customer’s order', async () => {
  const request = (body, status) =>
    withApi(url => {
      assert.equal(url.pathname, '/api/sales/orders/1');
      return Response.json(body, {status});
    }).getOrder(1);
  assert.equal((await request(wire.order, 200)).number, 'ORD-FLORIST01');
  await assert.rejects(request(wire['other-customer'], 404), {kind: 'not-found', status: 404});
  await assert.rejects(request({}, 401), {kind: 'unauthorized', status: 401});
});

test('rejects incomplete successful checkout bodies and leaves network recovery to the caller', async () => {
  const invalid = withApi(() => Response.json(checkoutInput, {status: 201}));
  await assert.rejects(invalid.submitCheckout(checkoutInput, submissionKey), {
    kind: 'invalid-response'
  });
  let calls = 0;
  const unavailable = withApi(() => {
    calls += 1;
    throw new TypeError('Connection reset');
  });
  await assert.rejects(unavailable.submitCheckout(checkoutInput, submissionKey), {kind: 'network'});
  assert.equal(calls, 1);
});

test('preserves a rejected delivery date as a field error for review', async () => {
  const deliveryDate = '2026-11-19';
  const api = withApi((url, init) => {
    assert.equal(url.pathname, '/api/sales/checkout');
    assert.equal(JSON.parse(init.body).deliveryDate, deliveryDate);
    return Response.json(wire.closedDate, {status: 422});
  });
  await assert.rejects(api.submitCheckout({...checkoutInput, deliveryDate}, submissionKey), {
    kind: 'validation',
    status: 422,
    issues: [{field: 'deliveryDate', message: wire.closedDate.violations[0].message}]
  });
});

test('catalog and cart review use an edited bouquet offer while order history keeps the purchase', async t => {
  const originalProduct = wire.products.member[0];
  const purchasedLine = {...wire.order.lines[0], lineAmount: 9500};
  const receipt = {...wire.order, lines: [purchasedLine]};
  let edited = false;
  const handle = url => {
    const product = {
      ...originalProduct,
      name: edited ? {en: 'Garden roses', fa: 'رز باغی'} : originalProduct.name,
      inStock: !edited,
      latestProductPrice: '/api/catalog/product-prices/1'
    };
    if (url.pathname === '/api/catalog/products') {
      return Response.json({...wire.products, member: [product]});
    }
    if (url.pathname === '/api/catalog/products/1') return Response.json(product);
    const price = {id: 1, amount: edited ? 6200 : 4800, currency: 'USD'};
    if (url.pathname === '/api/catalog/product-prices/1') return Response.json(price);
    if (url.pathname === '/api/catalog/product-prices') return Response.json({member: [price]});
    if (url.pathname === '/api/sales/carts/1') return Response.json(wire.cart);
    if (url.pathname === '/api/sales/checkout') return Response.json(receipt, {status: 201});
    assert.equal(url.pathname, '/api/sales/orders/1');
    return Response.json(receipt);
  };
  const api = withApi(handle);
  t.mock.method(globalThis, 'fetch', handle);

  assert.equal((await api.getProductByCode(originalProduct.token)).price.amount, 4800);
  const purchase = await api.submitCheckout(checkoutInput, submissionKey);
  edited = true;

  const catalog = await api.getProductByCode(originalProduct.token);
  const detail = await lookupLiveProduct({base: apiOrigin, locale: 'en'}, originalProduct.token);
  assert.equal(detail.kind, 'found');
  assert.deepEqual(detail.product.name, catalog.name);
  assert.deepEqual(detail.price, catalog.price);
  assert.equal(catalog.name.en, 'Garden roses');
  assert.equal(catalog.name.fa, 'رز باغی');
  assert.deepEqual(catalog.price, {amount: 6200, currency: 'USD'});
  const {selection, offer} = (await api.reviewCart(1)).lines[0];
  assert.equal(selection.productCode, originalProduct.token);
  assert.equal(selection.quantity, 2);
  assert.deepEqual(selection.selectedAddOns, ['card', 'chocolate']);
  assert.deepEqual(offer, {name: catalog.name, price: catalog.price, inStock: false});

  const history = await api.getOrder(1);
  assert.deepEqual(history.lines, purchase.lines);
  const [{name, quantity, unitAmount, lineAmount}] = history.lines;
  assert.deepEqual(
    {name, quantity, unitAmount, lineAmount},
    {
      name: 'Red roses',
      quantity: 2,
      unitAmount: 4800,
      lineAmount: 9500
    }
  );
});
