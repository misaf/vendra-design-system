// @ts-check
/** @param {string} base */
function catalogLocation(base) {
  const url = new URL(base);
  if (
    !['https:', 'http:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  )
    throw new Error('Invalid florist API base');
  return url;
}

/**
 * @param {string} base
 * @param {string} resource
 * @param {Record<string, string>} [query]
 */
async function readCollection(base, resource, query = {}) {
  const url = catalogLocation(base);
  url.pathname = url.pathname.replace(/\/$/, '') + '/api/catalog/' + resource;
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
    const response = await fetch(page, {
      headers: {Accept: 'application/ld+json'},
      cache: 'no-store',
      redirect: 'error',
      signal: deadline
    });
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

/** @param {string} base */
export async function loadLiveCategories(base) {
  const records = await readCollection(base, 'product-categories');
  if (records.some(record => !Number.isSafeInteger(record?.id) || !record.slug || !record.name))
    throw new Error('Invalid florist category');
  return records.filter(record => record.active !== false);
}

/**
 * @param {string} base
 * @param {Record<string, string>} [query]
 */
export async function loadLiveProducts(base, query) {
  const records = await readCollection(base, 'products', query);
  if (records.some(record => typeof record?.token !== 'string' || !record.token.trim()))
    throw new Error('Invalid florist product');

  /** @param {unknown} price */
  const isPriceReference = price =>
    typeof price === 'string' && /\/api\/catalog\/product-prices\/\d+$/.test(price);
  // Read prices from the configured backend and use the IRI only as a lookup key.
  const prices = records.some(record => isPriceReference(record.latestProductPrice))
    ? (await readCollection(base, 'product-prices', {itemsPerPage: '100'})).filter(record =>
        Number.isSafeInteger(record?.id)
      )
    : [];
  return records.map(record => {
    const price = record.latestProductPrice;
    if (typeof price !== 'string') return record;
    const id = isPriceReference(price) ? Number(price.split('/').pop()) : null;
    return {...record, latestProductPrice: prices.find(price => price.id === id) ?? null};
  });
}
