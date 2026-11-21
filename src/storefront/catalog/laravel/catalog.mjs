// @ts-check

import {laravelDeadline} from '../../../platform/server/laravel-http.ts';
import {isRecord, VendraApiError} from '../../../platform/server/laravel/errors.mjs';
import {currentProductPrice, productPriceReferenceId} from './price.js';
export {currentProductPrice};

/** @typedef {import('../../../platform/server/laravel-http.ts').LaravelHttp} LaravelHttp */

/**
 * @param {LaravelHttp} catalog
 * @param {string} resource
 * @param {Record<string, string>} [query]
 */
async function readCollection(catalog, resource, query = {}) {
  const url = catalog.url('/api/catalog/' + resource);
  url.search = new URLSearchParams(query).toString();
  const deadline = laravelDeadline();
  const seen = new Set();
  /** @type {unknown[]} */
  const records = [];
  /** @type {URL | null} */
  let page = url;
  while (page) {
    if (
      page.origin !== url.origin ||
      page.pathname !== url.pathname ||
      seen.has(page.href) ||
      seen.size >= 50
    )
      throw new Error('Invalid florist catalog pagination');
    seen.add(page.href);
    const data = await catalog.request(page, {signal: deadline});
    const members = isRecord(data) ? (data.member ?? data['hydra:member']) : null;
    if (!Array.isArray(members)) throw new Error('Invalid florist catalog collection');
    records.push(...members);
    const view = isRecord(data) ? (data.view ?? data['hydra:view']) : null;
    const next = isRecord(view) ? (view.next ?? view['hydra:next']) : null;
    if (next != null && (typeof next !== 'string' || !next))
      throw new Error('Invalid florist catalog page link');
    page = typeof next === 'string' ? new URL(next, page) : null;
  }
  return records;
}

/** @param {LaravelHttp} catalog @param {number} id @param {AbortSignal} signal */
async function readPrice(catalog, id, signal) {
  // The reference supplies only the ID; the storefront config supplies the backend.
  const price = await catalog
    .request('/api/catalog/product-prices/' + id, {signal})
    .catch(error => {
      if (error instanceof VendraApiError && error.kind === 'not-found') return null;
      throw error;
    });
  return isRecord(price) && price.id === id ? price : null;
}

/**
 * @param {unknown} record
 * @returns {record is {id: number, slug: Record<string, unknown>, name: Record<string, unknown>, active?: boolean}}
 */
function isCategory(record) {
  return (
    isRecord(record) &&
    Number.isSafeInteger(record.id) &&
    isRecord(record.slug) &&
    isRecord(record.name)
  );
}

/** @param {LaravelHttp} catalog */
export async function loadLiveCategories(catalog) {
  const records = await readCollection(catalog, 'product-categories');
  if (!records.every(isCategory)) throw new Error('Invalid florist category');
  return records.filter(record => record.active !== false);
}

/** @typedef {import('../product.js').CatalogPrice} ProductPrice */
/** @typedef {import('../product.js').LiveCatalogProduct} CatalogProduct */

/**
 * @param {unknown} record
 * @returns {record is CatalogProduct}
 */
function isProduct(record) {
  return (
    isRecord(record) &&
    typeof record.token === 'string' &&
    !!record.token.trim() &&
    (record.name == null || isRecord(record.name)) &&
    (record.description == null || isRecord(record.description)) &&
    (record.inStock == null || typeof record.inStock === 'boolean')
  );
}

/**
 * @param {LaravelHttp} catalog
 * @param {Record<string, string>} [query]
 * @returns {Promise<CatalogProduct[]>}
 */
async function readProducts(catalog, query) {
  const records = await readCollection(catalog, 'products', query);
  if (!records.every(isProduct)) throw new Error('Invalid florist product');
  return records;
}

/**
 * @param {LaravelHttp} catalog
 * @param {CatalogProduct[]} records
 */
async function resolvePrices(catalog, records) {
  const priceIds = records.map(record => productPriceReferenceId(record.latestProductPrice));
  const uniqueIds = [...new Set(priceIds.filter(id => id !== null))];
  const prices = new Map();
  const deadline = laravelDeadline();
  const batchSize = 10;
  for (let start = 0; start < uniqueIds.length; start += batchSize) {
    const batch = uniqueIds.slice(start, start + batchSize);
    await Promise.all(
      batch.map(async id => {
        prices.set(id, await readPrice(catalog, id, deadline));
      })
    );
  }
  return records.map((record, index) => {
    if (typeof record.latestProductPrice !== 'string') return record;
    return {...record, latestProductPrice: prices.get(priceIds[index]) ?? null};
  });
}

/**
 * @param {LaravelHttp} catalog
 * @param {Record<string, string>} [query]
 */
export async function loadLiveProducts(catalog, query) {
  return resolvePrices(catalog, await readProducts(catalog, query));
}

/**
 * @typedef {{kind: 'found', product: CatalogProduct, price: ProductPrice | null}
 * | {kind: 'missing'}
 * | {kind: 'unavailable'}} ProductLookup
 */

/**
 * @param {LaravelHttp} catalog
 * @param {string} token
 * @returns {Promise<ProductLookup>}
 */
export async function lookupLiveProduct(catalog, token) {
  try {
    const records = await readProducts(catalog, {token});
    const match = records.find(record => record.token === token);
    if (!match) return {kind: 'missing'};
    const [product] = await resolvePrices(catalog, [match]);
    return {kind: 'found', product, price: currentProductPrice(product.latestProductPrice)};
  } catch {
    return {kind: 'unavailable'};
  }
}
