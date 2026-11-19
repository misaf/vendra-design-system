import assert from 'node:assert/strict';
import {test} from 'node:test';
import {loadLiveCategories, loadLiveProducts} from '../server/live-catalog.mjs';

const base = 'https://florist-backend.example.test/store';
const product = {token: 'LIVE-1', latestProductPrice: {amount: 240000, currency: 'IRT'}};
const category = {id: 7, slug: {en: 'roses'}, name: {en: 'Roses'}, active: true};

test('reads all Hydra pages through the configured API with the server filter', async t => {
  const paths = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    paths.push(url.pathname + url.search);
    assert.equal(url.origin, new URL(base).origin);
    assert.equal(options.cache, 'no-store');
    assert.equal(options.redirect, 'error');
    if (paths.length === 1)
      return Response.json({
        member: [product],
        view: {next: '?categoryId=7&page=2'}
      });
    return Response.json({'hydra:member': [{...product, token: 'LIVE-2'}]});
  });
  assert.deepEqual(await loadLiveProducts(base, {categoryId: '7'}), [
    product,
    {...product, token: 'LIVE-2'}
  ]);
  assert.deepEqual(paths, [
    '/store/api/catalog/products?categoryId=7',
    '/store/api/catalog/products?categoryId=7&page=2'
  ]);
});

test('loads active category data and keeps an empty live catalog empty', async t => {
  t.mock.method(globalThis, 'fetch', async url =>
    Response.json({
      member: url.pathname.endsWith('/products')
        ? []
        : [category, {...category, id: 8, active: false}]
    })
  );
  assert.deepEqual(await loadLiveCategories(base), [category]);
  assert.deepEqual(await loadLiveProducts(base), []);
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
  t.mock.method(globalThis, 'fetch', async url => {
    assert.equal(url.origin, new URL(base).origin);
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

  assert.deepEqual(await loadLiveProducts(base), [
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
  await assert.rejects(loadLiveProducts(base), /catalog request failed/);
  fetchMock.mock.mockImplementation(async () => Response.json({unexpected: []}));
  await assert.rejects(loadLiveProducts(base), /catalog collection/);
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
    await assert.rejects(loadLiveProducts(base), /catalog pagination/);
    assert.equal(fetchMock.mock.callCount(), 1);
    fetchMock.mock.restore();
  }
});
