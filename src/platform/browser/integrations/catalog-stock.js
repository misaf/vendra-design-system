// GET /api/catalog/products -> {token: {inStock, quantity}}: what is in stock now, for screens that
// stay open all day (the counter presentation). null in demo mode. Follows the collection's next
// page (`hydra:view`/`view`) so a catalog larger than one page is read in full, up to
// STOCK_PAGES pages; a next link that repeats a page already read ends the walk.
const STOCK_PAGES = 50;
// A next link may be a path or a full URL; requests go through the client base either way.
const nextPath = r => {
  const view = r && (r['hydra:view'] || r.view);
  const next = view && (view['hydra:next'] || view.next);
  if (typeof next !== 'string' || !next) return '';
  if (!/^[a-z][a-z\d+.-]*:\/\//i.test(next)) return next;
  try {
    const url = new URL(next);
    return url.pathname + url.search;
  } catch {
    return '';
  }
};

/**
 * @param {{live: boolean}} client
 * @param {ReturnType<typeof import('./request.js').createRequest>} request
 */
export async function loadCatalogStock(client, request) {
  if (!client.live) return null;
  const products = [];
  const seen = new Set();
  let path = '/api/catalog/products?itemsPerPage=200';
  while (path && !seen.has(path) && seen.size < STOCK_PAGES) {
    seen.add(path);
    const r = await request('GET', path);
    products.push(...((r && (r['hydra:member'] || r.member || r.data)) || []));
    path = nextPath(r);
  }
  return Object.fromEntries(
    products
      .filter(product => product.token)
      .map(product => [
        product.token,
        {inStock: product.inStock !== false, quantity: product.quantity ?? null}
      ])
  );
}
