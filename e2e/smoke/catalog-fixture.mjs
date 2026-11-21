import {createServer} from 'node:http';

const retried = new Set();
const price = {'@id': '/api/catalog/product-prices/201', id: 201, amount: 240000, currency: 'IRT'};
const product = {
  name: {en: 'Garden roses', fa: 'رزهای باغی'},
  description: {en: 'A bouquet of fresh roses.', fa: 'دسته‌گلی از رزهای تازه.'},
  inStock: true
};

const document = (...paragraphs) => ({
  type: 'doc',
  content: paragraphs.map(parts => ({
    type: 'paragraph',
    content: parts.map(text => ({type: 'text', text}))
  }))
});

const richDescription = {
  en: document(['Cut fresh ', 'each morning.'], ['Arrange in a clean vase.']),
  fa: document(['هر صبح ', 'تازه چیده می‌شوند.'], ['در گلدان تمیز بچینید.'])
};

createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  if (url.pathname === '/') return response.end('Catalog fixture ready');
  const token = url.searchParams.get('token');
  const locale = request.headers['accept-language'];
  const tokenLocale = /-(en|fa)(?:-|$)/.exec(token)?.[1];
  if (
    request.headers.origin !== 'https://florist.example.test' ||
    (locale !== 'en' && locale !== 'fa') ||
    (token && tokenLocale !== locale) ||
    request.headers.accept !== 'application/ld+json'
  ) {
    console.error(`Unexpected catalog request headers for ${request.url}: %j`, {
      origin: request.headers.origin,
      locale,
      accept: request.headers.accept
    });
    response.writeHead(400);
    return response.end();
  }

  const jsonLd = data => {
    response.writeHead(200, {'Content-Type': 'application/ld+json'});
    response.end(JSON.stringify(data));
  };
  if (url.pathname === '/store' + price['@id']) return jsonLd(price);
  if (url.pathname === '/store/api/catalog/product-categories') return jsonLd({member: []});
  if (url.pathname !== '/store/api/catalog/products') {
    response.writeHead(404);
    return response.end();
  }

  const richProduct = {
    ...product,
    description: richDescription,
    token: `RICH-${locale}`,
    latestProductPrice: price['@id']
  };
  if (!token) return jsonLd({member: [richProduct]});
  if (token === richProduct.token) return jsonLd({member: [richProduct]});

  const failure = /^(ERROR|TIMEOUT)-(en|fa)-\d+-\d+$/.exec(token)?.[1];
  if (failure && !retried.has(token)) {
    retried.add(token);
    if (failure === 'TIMEOUT') return; // Wait for the storefront's deadline to close the request.
    response.writeHead(503);
    return response.end();
  }

  const priced = token === `PRICED-${locale}`;
  const unpriced = token === `UNPRICED-${locale}`;
  const englishOnly = token === `ENGLISH-ONLY-${locale}`;
  if (priced && !url.searchParams.has('page')) {
    const next = '?' + new URLSearchParams({token, page: '2'});
    return jsonLd({member: [], view: {next}});
  }

  const member =
    priced || unpriced || englishOnly || failure
      ? [
          {
            ...product,
            ...(englishOnly && {description: {en: richDescription.en}}),
            token,
            latestProductPrice: unpriced ? null : price['@id']
          }
        ]
      : [];
  return jsonLd({member});
}).listen(Number(process.argv[2]), '127.0.0.1');
