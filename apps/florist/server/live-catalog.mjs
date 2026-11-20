import {commerce} from '../shared/domain/commerce.js';

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

async function readCollection(base, resource, query = {}) {
  const url = catalogLocation(base);
  url.pathname = url.pathname.replace(/\/$/, '') + '/api/catalog/' + resource;
  url.search = new URLSearchParams(query).toString();
  const deadline = AbortSignal.timeout(10000);
  const seen = new Set();
  const records = [];
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

export async function loadLiveCategories(base) {
  const records = await readCollection(base, 'product-categories');
  if (records.some(record => !Number.isSafeInteger(record?.id) || !record.slug || !record.name))
    throw new Error('Invalid florist category');
  return records.filter(record => record.active !== false);
}

export async function loadLiveProducts(base, query) {
  const records = await readCollection(base, 'products', query);
  if (records.some(record => typeof record?.token !== 'string' || !record.token.trim()))
    throw new Error('Invalid florist product');

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
    return {
      ...record,
      latestProductPrice: isPriceReference(price) ? commerce.apiRecord(prices, price) : null
    };
  });
}
