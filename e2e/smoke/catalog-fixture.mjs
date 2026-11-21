import {createServer} from 'node:http';

const retried = new Set();
const product = {
  name: {en: 'Garden roses', fa: 'رزهای باغی'},
  description: {en: 'A bouquet of fresh roses.', fa: 'دسته‌گلی از رزهای تازه.'},
  inStock: true
};

createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  if (url.pathname === '/') return response.end('Catalog fixture ready');
  if (url.pathname !== '/store/api/catalog/products') {
    response.writeHead(404);
    return response.end();
  }

  const token = url.searchParams.get('token');
  const locale = /-(en|fa)(?:-|$)/.exec(token)?.[1];
  if (
    request.headers.origin !== 'https://florist.example.test' ||
    !locale ||
    request.headers['accept-language'] !== locale
  ) {
    response.writeHead(400);
    return response.end();
  }

  const failure = /^(ERROR|TIMEOUT)-(en|fa)-\d+-\d+$/.exec(token)?.[1];
  if (failure && !retried.has(token)) {
    retried.add(token);
    if (failure === 'TIMEOUT') return; // Wait for the storefront's deadline to close the request.
    response.writeHead(503);
    return response.end();
  }

  const priced = token === `PRICED-${locale}`;
  const unpriced = token === `UNPRICED-${locale}`;
  response.writeHead(200, {'Content-Type': 'application/ld+json'});
  if (priced && !url.searchParams.has('page')) {
    const next = '?' + new URLSearchParams({token, page: '2'});
    return response.end(JSON.stringify({'hydra:member': [], 'hydra:view': {'hydra:next': next}}));
  }

  const member =
    priced || unpriced || failure
      ? [
          {
            ...product,
            token,
            latestProductPrice: unpriced ? null : {amount: 240000, currency: 'IRT'}
          }
        ]
      : [];
  response.end(JSON.stringify({'hydra:member': member}));
}).listen(Number(process.argv[2]), '127.0.0.1');
