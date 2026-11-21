// @ts-check
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

/** @param {URL} url @param {AbortSignal} signal */
function fetchCatalog(url, signal) {
  return fetch(url, {
    headers: {Accept: 'application/ld+json'},
    cache: 'no-store',
    redirect: 'error',
    signal
  });
}

/**
 * @param {string} base
 * @param {string} resource
 * @param {Record<string, string>} [query]
 */
async function readCollection(base, resource, query = {}) {
  const url = catalogResourceUrl(base, resource);
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
    const response = await fetchCatalog(page, deadline);
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

/** @param {unknown} price */
function referencedPriceId(price) {
  if (typeof price !== 'string') return null;
  const match = /\/api\/catalog\/product-prices\/(\d+)$/.exec(price);
  const id = match ? Number(match[1]) : NaN;
  return Number.isSafeInteger(id) ? id : null;
}

/** @param {string} base @param {number} id @param {AbortSignal} signal */
async function readPrice(base, id, signal) {
  // The reference supplies only the ID; the storefront config supplies the backend.
  const response = await fetchCatalog(catalogResourceUrl(base, 'product-prices/' + id), signal);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Florist catalog request failed');
  const price = await response.json();
  return price?.id === id ? price : null;
}

/** @param {string} base */
export async function loadLiveCategories(base) {
  const records = await readCollection(base, 'product-categories');
  if (records.some(record => !Number.isSafeInteger(record?.id) || !record.slug || !record.name))
    throw new Error('Invalid florist category');
  return records.filter(record => record.active !== false);
}

/** @typedef {{amount: number, currency: string}} ProductPrice */
/**
 * @typedef {object} CatalogProduct
 * @property {string} token
 * @property {Record<string, unknown>} [name]
 * @property {Record<string, unknown>} [description]
 * @property {boolean} [inStock]
 * @property {unknown} [latestProductPrice]
 */

/**
 * @param {string} base
 * @param {Record<string, string>} [query]
 * @returns {Promise<CatalogProduct[]>}
 */
async function readProducts(base, query) {
  const records = await readCollection(base, 'products', query);
  if (records.some(record => typeof record?.token !== 'string' || !record.token.trim()))
    throw new Error('Invalid florist product');
  return records;
}

/**
 * @param {string} base
 * @param {CatalogProduct[]} records
 */
async function resolvePrices(base, records) {
  const priceIds = records.map(record => referencedPriceId(record.latestProductPrice));
  const uniqueIds = [...new Set(priceIds.filter(id => id !== null))];
  const prices = new Map();
  const deadline = AbortSignal.timeout(10000);
  const batchSize = 10;
  for (let start = 0; start < uniqueIds.length; start += batchSize) {
    const batch = uniqueIds.slice(start, start + batchSize);
    await Promise.all(
      batch.map(async id => {
        prices.set(id, await readPrice(base, id, deadline));
      })
    );
  }
  return records.map((record, index) => {
    if (typeof record.latestProductPrice !== 'string') return record;
    return {...record, latestProductPrice: prices.get(priceIds[index]) ?? null};
  });
}

/**
 * @param {string} base
 * @param {Record<string, string>} [query]
 */
export async function loadLiveProducts(base, query) {
  return resolvePrices(base, await readProducts(base, query));
}

/** @param {unknown} price @returns {ProductPrice | null} */
export function currentProductPrice(price) {
  if (!price || typeof price !== 'object' || !('amount' in price) || !('currency' in price))
    return null;
  const {amount, currency} = price;
  if (
    typeof amount !== 'number' ||
    !Number.isFinite(amount) ||
    amount < 0 ||
    typeof currency !== 'string' ||
    !/^[A-Z]{3}$/.test(currency)
  )
    return null;
  return {amount, currency};
}

/**
 * @typedef {{kind: 'found', product: CatalogProduct, price: ProductPrice | null}
 * | {kind: 'missing'}
 * | {kind: 'unavailable'}} ProductLookup
 */

/**
 * @param {string} base
 * @param {string} token
 * @returns {Promise<ProductLookup>}
 */
export async function lookupLiveProduct(base, token) {
  try {
    const records = await readProducts(base, {token});
    const match = records.find(record => record.token === token);
    if (!match) return {kind: 'missing'};
    const [product] = await resolvePrices(base, [match]);
    return {kind: 'found', product, price: currentProductPrice(product.latestProductPrice)};
  } catch {
    return {kind: 'unavailable'};
  }
}
