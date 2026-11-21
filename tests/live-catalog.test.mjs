import assert from 'node:assert/strict';
import {test} from 'node:test';
import {
  loadLiveCategories,
  loadLiveProducts,
  lookupLiveProduct
} from '../src/platform/server/laravel/catalog.mjs';

const catalog = {
  base: 'https://florist-backend.example.test/store',
  storefrontOrigin: 'https://florist.example.test/',
  locale: 'en'
};
const product = {token: 'LIVE-1', latestProductPrice: {amount: 240000, currency: 'IRT'}};
const category = {id: 7, slug: {en: 'roses'}, name: {en: 'Roses'}, active: true};

test('reads all Hydra pages through the configured API with the server filter', async t => {
  const paths = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    paths.push(url.pathname + url.search);
    assert.equal(url.origin, new URL(catalog.base).origin);
    assert.equal(options.headers.get('Origin'), 'https://florist.example.test');
    assert.equal(options.headers.get('Accept-Language'), 'en');
    assert.equal(options.cache, 'no-store');
    assert.equal(options.redirect, 'error');
    if (paths.length === 1)
      return Response.json({
        member: [product],
        view: {next: '?categoryId=7&page=2'}
      });
    return Response.json({'hydra:member': [{...product, token: 'LIVE-2'}]});
  });
  assert.deepEqual(await loadLiveProducts(catalog, {categoryId: '7'}), [
    product,
    {...product, token: 'LIVE-2'}
  ]);
  assert.deepEqual(paths, [
    '/store/api/catalog/products?categoryId=7',
    '/store/api/catalog/products?categoryId=7&page=2'
  ]);
});

test('loads active category data and keeps an empty live catalog empty', async t => {
  const tenantBackend = {base: catalog.base, locale: 'fa'};
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(options.headers.get('Origin'), null);
    assert.equal(options.headers.get('Accept-Language'), 'fa');
    return Response.json({
      member: url.pathname.endsWith('/products')
        ? []
        : [category, {...category, id: 8, active: false}]
    });
  });
  assert.deepEqual(await loadLiveCategories(tenantBackend), [category]);
  assert.deepEqual(await loadLiveProducts(tenantBackend), []);
});

test('resolves JSON-LD latest price references across price pages', async t => {
  const latest = {
    '@id': '/api/catalog/product-prices/201',
    id: 201,
    amount: 240000,
    currency: 'IRT'
  };
  const referenced = {...product, latestProductPrice: latest['@id']};
  const missing = {token: 'MISSING', latestProductPrice: '/api/catalog/product-prices/999'};
  const unpriced = {token: 'UNPRICED', latestProductPrice: null};
  const paths = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url.origin, new URL(catalog.base).origin);
    assert.equal(options.headers.get('Origin'), 'https://florist.example.test');
    assert.equal(options.headers.get('Accept-Language'), 'en');
    paths.push(url.pathname + url.search);
    if (url.pathname.endsWith('/products'))
      return Response.json({member: [referenced, missing, unpriced]});
    if (!url.searchParams.has('page'))
      return Response.json({
        member: [{id: 200, amount: 160000, currency: 'IRT'}],
        view: {next: '?itemsPerPage=100&page=2'}
      });
    return Response.json({'hydra:member': [latest]});
  });

  assert.deepEqual(await loadLiveProducts(catalog), [
    {...referenced, latestProductPrice: latest},
    {...missing, latestProductPrice: null},
    unpriced
  ]);
  assert.deepEqual(paths, [
    '/store/api/catalog/products',
    '/store/api/catalog/product-prices?itemsPerPage=100',
    '/store/api/catalog/product-prices?itemsPerPage=100&page=2'
  ]);
});

test('rejects upstream errors and malformed collections', async t => {
  const fetchMock = t.mock.method(
    globalThis,
    'fetch',
    async () => new Response(null, {status: 503})
  );
  await assert.rejects(loadLiveProducts(catalog), /catalog request failed/);
  fetchMock.mock.mockImplementation(async () => Response.json({unexpected: []}));
  await assert.rejects(loadLiveProducts(catalog), /catalog collection/);
});

test('rejects pagination that leaves the catalog endpoint or loops', async t => {
  for (const next of [
    'https://elsewhere.example.test/store/api/catalog/products',
    '/store/api/sales/orders',
    '/store/api/catalog/products'
  ]) {
    const fetchMock = t.mock.method(globalThis, 'fetch', async () =>
      Response.json({member: [product], view: {next}})
    );
    await assert.rejects(loadLiveProducts(catalog), /catalog pagination/);
    assert.equal(fetchMock.mock.callCount(), 1);
    fetchMock.mock.restore();
  }
});

test('looks up the exact product and resolves only its price', async t => {
  const price = {id: 201, amount: 0, currency: 'IRT'};
  const referenced = {...product, latestProductPrice: '/api/catalog/product-prices/201'};
  t.mock.method(globalThis, 'fetch', async url => {
    if (url.pathname.endsWith('/products')) {
      assert.equal(url.searchParams.get('token'), product.token);
      return Response.json({member: [referenced]});
    }
    return Response.json({member: [price]});
  });
  assert.deepEqual(await lookupLiveProduct(catalog, product.token), {
    kind: 'found',
    product: {...product, latestProductPrice: price},
    price: {amount: 0, currency: 'IRT'}
  });
});

test('a successful lookup with no exact match skips unrelated price references', async t => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () =>
    Response.json({
      member: [{...product, latestProductPrice: '/api/catalog/product-prices/201'}]
    })
  );
  assert.deepEqual(await lookupLiveProduct(catalog, 'MISSING'), {kind: 'missing'});
  assert.equal(fetchMock.mock.callCount(), 1);
});

test('an existing product can have no usable current price', async t => {
  const fetchMock = t.mock.method(globalThis, 'fetch');
  for (const latestProductPrice of [
    undefined,
    null,
    {amount: '240000', currency: 'IRT'},
    {amount: -1, currency: 'IRT'},
    {amount: 240000, currency: ''},
    '/api/catalog/product-prices/999'
  ]) {
    const unpriced = {...product, latestProductPrice};
    fetchMock.mock.mockImplementation(async url =>
      Response.json({member: url.pathname.endsWith('/products') ? [unpriced] : []})
    );
    const result = await lookupLiveProduct(catalog, product.token);
    assert.equal(result.kind, 'found');
    assert.equal(result.product.token, product.token);
    assert.equal(result.price, null);
  }
});

test('upstream failure, timeout and malformed data make the lookup unavailable', async t => {
  const fetchMock = t.mock.method(globalThis, 'fetch');
  for (const fetch of [
    async () => new Response(null, {status: 503}),
    async () => new Response(null, {status: 404}),
    async () => Response.json({unexpected: []}),
    async () => {
      throw new DOMException('Catalog deadline expired', 'TimeoutError');
    }
  ]) {
    fetchMock.mock.mockImplementation(fetch);
    assert.deepEqual(await lookupLiveProduct(catalog, product.token), {kind: 'unavailable'});
  }

  fetchMock.mock.mockImplementation(async url =>
    url.pathname.endsWith('/products')
      ? Response.json({
          member: [{...product, latestProductPrice: '/api/catalog/product-prices/201'}]
        })
      : new Response(null, {status: 503})
  );
  assert.deepEqual(await lookupLiveProduct(catalog, product.token), {kind: 'unavailable'});
});
