// Route metadata comes from the same catalog and translations as the Next.js pages.
// The actual static HTML and hydration are exercised against the exported app in Playwright.
import assert from 'node:assert/strict';
import {routeHead, tenantFontUrls} from '../src/app/_routing/route-head.mjs';
import {storefrontRoutes} from '../tools/build/routes.mjs';
import {VF_POSTS} from '../src/storefront/content/journal-content.js';
import {vfAbsoluteUrl, vfServerRender} from '../src/platform/browser/environment.js';
import {VF_STORE, vfLiveStore} from '../src/storefront/store/store-config.js';
import {VF_SEO} from '../src/storefront/shell/seo.js';
import {vfFindProduct} from '../src/storefront/catalog/catalog.js';

const origin = 'https://shop.example';
const app = origin + '/';
const page = address => routeHead(address, {origin}).tags;
const meta = (page, name) => page.meta.find(tag => tag.name === name)?.content || undefined;
const link = (page, rel, lang) =>
  page.links.find(tag => tag.rel === rel && tag.hreflang === lang)?.href;

const post = VF_POSTS.find(item => item.id === 'bouquet-last-longer');
const cases = [
  {
    address: 'en/product/VF-7K2M4Q/',
    lang: 'en',
    heading: 'VF-7K2M4Q',
    image: /\/assets\/products\/[\w-]+\.webp$/,
    alternate: ['fa', 'fa/product/VF-7K2M4Q/']
  },
  {
    address: 'en/shop/boxes/',
    lang: 'en',
    heading: 'The shop.',
    image: /\/assets\/social\/og-default-en\.png$/,
    alternate: ['fa', 'fa/shop/boxes/']
  },
  {
    address: 'en/journal/bouquet-last-longer/',
    lang: 'en',
    heading: post.en[0],
    image: /\/assets\/journal\/bouquet-last-longer\.webp$/,
    alternate: ['fa', 'fa/journal/bouquet-last-longer/']
  },
  {
    address: 'fa/',
    lang: 'fa',
    heading: 'خرید بر اساس دسته‌بندی.',
    image: /\/assets\/social\/og-default-fa\.png$/,
    alternate: ['en', 'en/']
  }
];
for (const {address, lang, heading, image, alternate} of cases) {
  const tags = page(address);
  assert.equal(tags.title, heading + ' · ' + VF_STORE.brand[lang]);
  assert.equal(meta(tags, 'og:title'), tags.title);
  assert.match(meta(tags, 'og:image'), new RegExp('^' + origin + image.source));
  assert.equal(link(tags, 'canonical'), app + address);
  assert.equal(link(tags, 'alternate', lang), app + address);
  assert.equal(link(tags, 'alternate', alternate[0]), app + alternate[1]);
  assert.ok(link(tags, 'alternate', 'x-default'));
  assert.equal(meta(tags, 'robots'), undefined);
}

const bag = page('en/bag/');
assert.equal(meta(bag, 'robots'), 'noindex, follow');
assert.ok(bag.links.every(tag => tag.rel !== 'alternate'));
const missing = page('en/404/');
assert.equal(meta(missing, 'robots'), 'noindex, follow');
assert.equal(link(missing, 'canonical'), undefined);
assert.equal(meta(missing, 'og:url'), undefined);
// Without VF_ORIGIN the store's own URLs start at the site root; an image on another host keeps
// its origin. On the server a configured apiBase makes the store live, as in the browser.
vfServerRender({url: '/en/'});
try {
  assert.equal(vfAbsoluteUrl('/assets/products/rose.webp'), '/assets/products/rose.webp');
  assert.equal(
    vfAbsoluteUrl('https://cdn.example.com/products/rose.webp'),
    'https://cdn.example.com/products/rose.webp',
    'external preview images keep their host'
  );
} finally {
  vfServerRender(null);
}
const apiBase = VF_STORE.apiBase;
VF_STORE.apiBase = 'https://api.example.com';
assert.equal(vfLiveStore(), true, 'the prerender sees a configured API as live');
VF_STORE.apiBase = apiBase;
assert.equal(vfLiveStore(), false);

// Structured data (JSON-LD) is in the source, from the store's own data: the product with its
// offer and breadcrumb trail, the studio as a Florist, the FAQ and journal articles. Private pages
// have none.
const graph = tags => {
  if (!tags.jsonLd) return [];
  const data = JSON.parse(tags.jsonLd);
  assert.equal(data['@context'], 'https://schema.org');
  return data['@graph'];
};
const typed = (html, type) => graph(html).find(item => item['@type'] === type);
const product = typed(page('en/product/VF-7K2M4Q/'), 'Product');
assert.equal(product.name, 'VF-7K2M4Q', 'the product is named by its code');
assert.equal(product.url, app + 'en/product/VF-7K2M4Q/');
assert.match(product.image[0], new RegExp('^' + origin + '/assets/products/'));
assert.equal(product.offers.priceCurrency, 'IRR', 'Toman is written as Rial (ISO 4217)');
assert.equal(product.offers.price, String(vfFindProduct('VF-7K2M4Q').price * 10), 'price in Rial');
assert.equal(product.offers.availability, 'https://schema.org/InStock');
const crumbs = typed(page('fa/product/VF-7K2M4Q/'), 'BreadcrumbList');
assert.deepEqual(
  crumbs.itemListElement.map(item => item.item),
  [app + 'fa/shop/', app + 'fa/shop/boxes/', app + 'fa/product/VF-7K2M4Q/'],
  "the breadcrumb trail is the page's own"
);
const florist = typed(page('en/contact/'), 'Florist');
assert.equal(florist.name, VF_STORE.brand.en);
assert.equal(florist.telephone, VF_STORE.phone);
assert.equal(florist.geo.latitude, VF_STORE.studio.lat);
assert.equal(florist.openingHoursSpecification[0].opens, VF_STORE.hours.week[0].opens);
assert.ok(typed(page('fa/'), 'Florist'), 'the home page names the studio');
const faq = typed(page('en/faq/'), 'FAQPage');
assert.ok(faq.mainEntity.length > 3 && faq.mainEntity[0].acceptedAnswer.text, 'FAQ answers');
const article = typed(page('en/journal/bouquet-last-longer/'), 'Article');
assert.equal(article.headline, post.en[0]);
assert.equal(article.datePublished, post.publishedAt);
assert.deepEqual(graph(bag), [], 'private pages carry no structured data');
assert.ok(
  VF_SEO.headHtml({structuredData: [{'@type': 'Thing', name: '</script><b>'}]}).includes(
    '\\u003c/script>\\u003cb>'
  ),
  'text in the data cannot close the script element'
);

// Every route renders on the server with its heading, and every indexed one has an absolute
// preview image with its alt text and size, so a shared link shows a picture (#150).
for (const route of storefrontRoutes()) {
  const html = page(route.path);
  if (!route.indexed) continue;
  const where = route.path + ': ';
  assert.match(meta(html, 'og:image') || '', /^https:\/\/\S+$/, where + 'absolute og:image');
  assert.ok(meta(html, 'og:image:alt'), where + 'og:image:alt');
  assert.match(meta(html, 'og:image:width') || '', /^\d+$/, where + 'og:image:width');
  assert.match(meta(html, 'og:image:height') || '', /^\d+$/, where + 'og:image:height');
  assert.equal(meta(html, 'twitter:card'), 'summary_large_image', where + 'twitter:card');
  const isProduct = route.page.startsWith('product/');
  assert.equal(meta(html, 'og:type') === 'product', isProduct, where + 'og:type');
  if (isProduct) {
    assert.match(meta(html, 'product:price:amount') || '', /^\d+(\.\d+)?$/, where + 'price');
    assert.equal(meta(html, 'product:price:currency'), 'IRR', where + 'price currency');
  } else assert.equal(meta(html, 'product:price:amount'), undefined, where + 'no price');
}
const productHtml = page('en/product/VF-7K2M4Q/');
assert.equal(meta(productHtml, 'og:image:width'), '1120', 'the product photo’s own width');
assert.equal(meta(productHtml, 'og:image:height'), '1400', 'the product photo’s own height');
assert.notEqual(meta(productHtml, 'og:image:alt'), 'VF-7K2M4Q', 'the photo is described');
const home = page('en/');
assert.equal(meta(home, 'og:image:width'), '1200', 'the default preview image width');
assert.equal(meta(home, 'og:image:height'), '630', 'the default preview image height');
console.log('Checked metadata for ' + storefrontRoutes().length + ' Next.js routes.');

assert.deepEqual(await tenantFontUrls(null, 'fa'), []);
assert.deepEqual(await tenantFontUrls('clay', 'fa'), []);
