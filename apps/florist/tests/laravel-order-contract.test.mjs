import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import {createVendraApi, VendraApiError} from '@vendra/vendra-api';

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
