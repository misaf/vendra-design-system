import {createServer} from 'node:http';

const category = {
  id: 42,
  slug: {en: 'orchids', fa: 'ارکیده'},
  name: {en: 'Orchids', fa: 'ارکیده‌ها'},
  active: true
};
const product = {
  token: 'LIVE-ORCHID',
  name: {en: 'Studio orchid', fa: 'ارکیدهٔ استودیو'},
  latestProductPrice: {amount: 245000, currency: 'IRT'},
  inStock: true
};
const outages = new Set();

createServer((request, response) => {
  const {pathname, searchParams} = new URL(request.url, 'http://localhost');
  function json(status, body) {
    response.writeHead(status, {'Content-Type': 'application/ld+json'});
    response.end(JSON.stringify(body));
  }

  if (pathname === '/') return json(200, {});
  if (pathname === '/tenant/api/catalog/product-categories') return json(200, {member: [category]});
  if (pathname !== '/tenant/api/catalog/products') return json(404, {});

  const token = searchParams.get('token');
  if (token?.startsWith('LIVE-RETRY-')) {
    if (!outages.has(token)) {
      outages.add(token);
      return json(503, {});
    }
    return json(200, {member: [{...product, token}]});
  }
  if (token) return json(200, {member: token === product.token ? [product] : []});
  if (searchParams.get('categoryId') === String(category.id)) return json(200, {member: [product]});
  // An unfiltered query also returns a second product, so category tests catch a lost filter.
  return json(200, {
    member: [product, {...product, token: 'LIVE-ROSE', name: {en: 'Studio rose', fa: 'رز استودیو'}}]
  });
}).listen(Number(process.argv[2]), '127.0.0.1');
