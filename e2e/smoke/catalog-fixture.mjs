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
  if (url.pathname !== '/api/catalog/products') {
    response.writeHead(404);
    return response.end();
  }

  const token = url.searchParams.get('token');
  const failure = /^(ERROR|TIMEOUT)-(en|fa)-\d+-\d+$/.exec(token)?.[1];
  if (failure && !retried.has(token)) {
    retried.add(token);
    if (failure === 'TIMEOUT') return; // Wait for the storefront's deadline to close the request.
    response.writeHead(503);
    return response.end();
  }

  const member =
    token === 'PRICED' || token === 'UNPRICED' || failure
      ? [
          {
            ...product,
            token,
            latestProductPrice: token === 'UNPRICED' ? null : {amount: 240000, currency: 'IRT'}
          }
        ]
      : [];
  response.writeHead(200, {'Content-Type': 'application/ld+json'});
  response.end(JSON.stringify({'hydra:member': member}));
}).listen(Number(process.argv[2]), '127.0.0.1');
