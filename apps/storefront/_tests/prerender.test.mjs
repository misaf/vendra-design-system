// The build's prerendered pages (_build/prerender.mjs): each page's own source carries its heading,
// title, link-preview tags, canonical address and language alternates, before any script runs.
// Builds the server entry (app/entry-server.jsx) and renders pages as `npm run build:app` does.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildServer, prerenderedPage} from '../_build/prerender.mjs';
import {storefrontRoutes} from '../_build/routes.mjs';
import {VF_POSTS} from '../_shared/translations/journal-content.js';
import {vfAbsoluteUrl, vfServerRender} from '../_shared/platform/environment.js';
import {VF_STORE, vfLiveStore} from '../_shared/domain/store-config.js';
import {VF_SEO} from '../_shared/services/seo.js';
import {vfFindProduct} from '../_shared/domain/catalog.js';

const templates = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Inside the repository, so the built entry finds React in node_modules.
fs.mkdirSync(path.join(templates, '../../node_modules/.vite'), {recursive: true});
const outDir = fs.mkdtempSync(path.join(templates, '../../node_modules/.vite/prerender-test-'));
const origin = 'https://shop.example';
const app = origin + '/apps/storefront/app/';
try {
  const server = await buildServer({outDir});
  const shell = fs.readFileSync(path.join(templates, 'app/index.html'), 'utf8');
  const page = address => prerenderedPage(server, shell, address, {origin});
  const one = (html, pattern, message) => {
    const found = html.match(pattern);
    assert.ok(found, message);
    assert.equal(html.match(new RegExp(pattern, 'g')).length, 1, message + ' (once)');
    return found[1];
  };
  const text = value =>
    value
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .trim();
  const post = VF_POSTS.find(item => item.id === 'care');
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
      address: 'en/journal/care/',
      lang: 'en',
      heading: post.en[0],
      image: /\/assets\/journal\/care\.webp$/,
      alternate: ['fa', 'fa/journal/care/']
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
    const html = await page(address);
    const where = address + ': ';
    assert.match(
      html,
      new RegExp(`<html lang="${lang}" dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`),
      where + 'language and direction'
    );
    const main = html.slice(html.indexOf('<main'));
    assert.equal(text(/<h1\b[^>]*>([\s\S]*?)<\/h1>/.exec(main)[1]), heading, where + 'h1');
    const title = one(html, '<title>([^<]*)</title>', where + 'title');
    assert.ok(title.startsWith(heading.replace(/&/g, '&amp;') + ' · '), where + 'title is the h1');
    assert.equal(
      one(html, '<meta property="og:title" content="([^"]*)"', where + 'og:title'),
      title,
      where + 'og:title'
    );
    assert.match(
      one(html, '<meta property="og:image" content="([^"]*)"', where + 'og:image'),
      new RegExp('^' + origin + image.source),
      where + 'og:image'
    );
    assert.equal(
      one(html, '<link rel="canonical" href="([^"]*)"', where + 'canonical'),
      app + address,
      where + 'canonical'
    );
    assert.equal(
      one(html, '<link rel="alternate" hreflang="' + lang + '" href="([^"]*)"', where + 'hreflang'),
      app + address,
      where + 'hreflang to itself'
    );
    assert.equal(
      one(
        html,
        '<link rel="alternate" hreflang="' + alternate[0] + '" href="([^"]*)"',
        where + 'hreflang'
      ),
      app + alternate[1],
      where + 'hreflang to the other language'
    );
    assert.ok(html.includes('hreflang="x-default"'), where + 'x-default');
    assert.ok(!html.includes('name="robots"'), where + 'indexed');
    assert.ok(html.includes(`data-vf-path="/apps/storefront/app/${address}"`), where + 'address');
  }

  // Private pages say so; the 404 page names no address of its own.
  const bag = await page('en/bag/');
  assert.ok(
    bag.includes('<meta name="robots" content="noindex, follow"'),
    'the bag is not indexed'
  );
  assert.ok(!bag.includes('hreflang='), 'noindex pages list no alternates');
  const missing = await prerenderedPage(server, shell, 'en/404/', {origin, notFound: true});
  assert.ok(missing.includes('noindex'), 'the 404 page is not indexed');
  assert.ok(!/rel="canonical"|og:url|data-vf-path/.test(missing), 'the 404 page has no address');
  assert.ok(
    missing.includes('data-vf-routing'),
    'the 404 page waits for the app to read the address'
  );

  // Without VF_ORIGIN the store's own URLs start at the site root; an image on another host keeps
  // its origin. On the server a configured apiBase makes the store live, as in the browser.
  vfServerRender({url: '/apps/storefront/app/en/'});
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
  const graph = html => {
    const scripts = [
      ...html.matchAll(/<script type="application\/ld\+json" data-ag-seo>([^<]*)<\/script>/g)
    ];
    assert.ok(scripts.length <= 1, 'one JSON-LD script at most');
    if (!scripts.length) return [];
    const data = JSON.parse(scripts[0][1]);
    assert.equal(data['@context'], 'https://schema.org');
    return data['@graph'];
  };
  const typed = (html, type) => graph(html).find(item => item['@type'] === type);
  const product = typed(await page('en/product/VF-7K2M4Q/'), 'Product');
  assert.equal(product.name, 'VF-7K2M4Q', 'the product is named by its code');
  assert.equal(product.url, app + 'en/product/VF-7K2M4Q/');
  assert.match(product.image[0], new RegExp('^' + origin + '/assets/products/'));
  assert.equal(product.offers.priceCurrency, 'IRR', 'Toman is written as Rial (ISO 4217)');
  assert.equal(
    product.offers.price,
    String(vfFindProduct('VF-7K2M4Q').price * 10),
    'price in Rial'
  );
  assert.equal(product.offers.availability, 'https://schema.org/InStock');
  const crumbs = typed(await page('fa/product/VF-7K2M4Q/'), 'BreadcrumbList');
  assert.deepEqual(
    crumbs.itemListElement.map(item => item.item),
    [app + 'fa/shop/', app + 'fa/shop/boxes/', app + 'fa/product/VF-7K2M4Q/'],
    "the breadcrumb trail is the page's own"
  );
  const florist = typed(await page('en/contact/'), 'Florist');
  assert.equal(florist.name, VF_STORE.brand.en);
  assert.equal(florist.telephone, VF_STORE.phone);
  assert.equal(florist.geo.latitude, VF_STORE.studio.lat);
  assert.equal(florist.openingHoursSpecification[0].opens, VF_STORE.hours.week[0].opens);
  assert.ok(typed(await page('fa/'), 'Florist'), 'the home page names the studio');
  const faq = typed(await page('en/faq/'), 'FAQPage');
  assert.ok(faq.mainEntity.length > 3 && faq.mainEntity[0].acceptedAnswer.text, 'FAQ answers');
  const article = typed(await page('en/journal/care/'), 'Article');
  assert.equal(article.headline, post.en[0]);
  assert.equal(article.datePublished, post.publishedAt);
  assert.deepEqual(graph(bag), [], 'private pages carry no structured data');
  assert.ok(
    VF_SEO.headHtml({structuredData: [{'@type': 'Thing', name: '</script><b>'}]}).includes(
      '\\u003c/script>\\u003cb>'
    ),
    'text in the data cannot close the script element'
  );

  for (const route of storefrontRoutes()) await page(route.path);

  console.log(
    'Passed: prerendered pages carry their heading, title, preview tags, canonical, alternates and structured data (' +
      storefrontRoutes().length +
      ' routes).'
  );
} finally {
  fs.rmSync(outDir, {recursive: true, force: true});
}
