// @ts-check

import {
  currentProductPrice,
  productPriceReferenceId
} from '../../../storefront/catalog/laravel/price.js';
import {createStorefrontFetch} from './storefront-fetch.mjs';
export {currentProductPrice};

/** @typedef {{base: string, storefrontOrigin?: string, locale: 'en' | 'fa'}} CatalogContext */

/**
 * @param {string} base
 * @param {string} resource
 */
function catalogResourceUrl(base, resource) {
  const url = new URL(base);
  if (
    !['https:', 'http:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  )
    throw new Error('Invalid florist API base');
  url.pathname = url.pathname.replace(/\/$/, '') + '/api/catalog/' + resource;
  return url;
}

/** @param {CatalogContext} catalog */
function createCatalogFetch(catalog) {
  const fetchStorefront = createStorefrontFetch(catalog);
  /** @param {URL} url @param {AbortSignal} signal */
  return (url, signal) =>
    fetchStorefront(url, {
      headers: {Accept: 'application/ld+json'},
      cache: 'no-store',
      redirect: 'error',
      signal
    });
}

/**
 * @param {CatalogContext} catalog
 * @param {string} resource
 * @param {Record<string, string>} [query]
 */
async function readCollection(catalog, resource, query = {}) {
  const url = catalogResourceUrl(catalog.base, resource);
  const fetchPage = createCatalogFetch(catalog);
  url.search = new URLSearchParams(query).toString();
  const deadline = AbortSignal.timeout(10000);
  const seen = new Set();
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
    /** @type {Response} */
    const response = await fetchPage(page, deadline);
    if (!response.ok) throw new Error('Florist catalog request failed');
    const data = await response.json();
    const members = data?.member ?? data?.['hydra:member'];
    if (!Array.isArray(members)) throw new Error('Invalid florist catalog collection');
    records.push(...members);
    const view = data.view ?? data['hydra:view'];
    const next = view?.next ?? view?.['hydra:next'];
    if (next != null && (typeof next !== 'string' || !next))
      throw new Error('Invalid florist catalog page link');
    page = next ? new URL(next, page) : null;
  }
  return records;
}

/**
 * @param {ReturnType<typeof createCatalogFetch>} fetchPrice
 * @param {string} base
 * @param {number} id
 * @param {AbortSignal} signal
 */
async function readPrice(fetchPrice, base, id, signal) {
  // The reference supplies only the ID; the storefront config supplies the backend.
  const response = await fetchPrice(catalogResourceUrl(base, 'product-prices/' + id), signal);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Florist catalog request failed');
  const price = await response.json();
  return price?.id === id ? price : null;
}

/** @param {CatalogContext} catalog */
export async function loadLiveCategories(catalog) {
  const records = await readCollection(catalog, 'product-categories');
  if (records.some(record => !Number.isSafeInteger(record?.id) || !record.slug || !record.name))
    throw new Error('Invalid florist category');
  return records.filter(record => record.active !== false);
}

/** @typedef {import('../../../storefront/catalog/product.js').CatalogPrice} ProductPrice */
/** @typedef {import('../../../storefront/catalog/product.js').LiveCatalogProduct} CatalogProduct */

/**
 * @param {CatalogContext} catalog
 * @param {Record<string, string>} [query]
 * @returns {Promise<CatalogProduct[]>}
 */
async function readProducts(catalog, query) {
  const records = await readCollection(catalog, 'products', query);
  if (records.some(record => typeof record?.token !== 'string' || !record.token.trim()))
    throw new Error('Invalid florist product');
  return records;
}

/**
 * @param {CatalogContext} catalog
 * @param {CatalogProduct[]} records
 */
async function resolvePrices(catalog, records) {
  const priceIds = records.map(record => productPriceReferenceId(record.latestProductPrice));
  const uniqueIds = [...new Set(priceIds.filter(id => id !== null))];
  const prices = new Map();
  const fetchPrice = createCatalogFetch(catalog);
  const deadline = AbortSignal.timeout(10000);
  const batchSize = 10;
  for (let start = 0; start < uniqueIds.length; start += batchSize) {
    const batch = uniqueIds.slice(start, start + batchSize);
    await Promise.all(
      batch.map(async id => {
        prices.set(id, await readPrice(fetchPrice, catalog.base, id, deadline));
      })
    );
  }
  return records.map((record, index) => {
    if (typeof record.latestProductPrice !== 'string') return record;
    return {...record, latestProductPrice: prices.get(priceIds[index]) ?? null};
  });
}

/**
 * @param {CatalogContext} catalog
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
 * @param {CatalogContext} catalog
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
