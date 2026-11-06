// Every page of the storefront that has an address of its own, as paths under the app's path
// (en/shop/boxes/). The production build writes the app's page at each of them, so a static host
// serves every address directly; `indexed` marks the ones search engines may list (the sitemap).
// `lang` is the route's language, `page` names the same page in every language (shop/boxes/), and
// `lastmod` is the date its content last changed (YYYY-MM-DD) when the data says so.
import {VF_POLICIES, VF_ROUTES, vfAppBase, vfRouteUrl} from '../shared/services/routing.js';
import {VF_PRODUCTS} from '../shared/domain/catalog.js';
import {VF_POSTS} from '../shared/translations/journal-content.js';
import {VF_CATEGORY_SLUGS} from '../shared/domain/product-categories.js';
import {VF_STORE, vfFeatures} from '../shared/domain/store-config.js';
import {VF_SEO} from '../shared/services/seo.js';

// Pages reached only through another page's address (product/<id>/, journal/<post>/), and the
// not-found and error screens, which the host's 404 page shows.
const DYNAMIC = new Set(['product', 'post', 'notfound', 'error']);

export function storefrontRoutes() {
  const features = vfFeatures();
  const offered = view =>
    (view !== 'weddings' || features.weddings) &&
    (!['journal', 'post'].includes(view) || features.journal);
  const routes = [];
  for (const lang of VF_STORE.languages) {
    const add = (route, lastmod) => {
      if (!offered(route.view)) return;
      // The first policy also has its own address (policy/shipping/); list that one.
      const indexed =
        !VF_SEO.isNoindex(route.view) &&
        route.view !== 'signin' &&
        !(route.view === 'policy' && !route.id);
      const path = vfRouteUrl({lang, ...route}).slice(vfAppBase().length);
      routes.push({
        path,
        lang,
        page: path.slice(lang.length + 1),
        indexed,
        ...(lastmod && {lastmod})
      });
    };
    // The journal changes whenever a post is published.
    const newestPost = VF_POSTS.map(post => post.publishedAt)
      .sort()
      .at(-1);
    for (const view of VF_ROUTES.filter(view => !DYNAMIC.has(view)))
      add({view}, view === 'journal' ? newestPost : undefined);
    for (const cat of VF_CATEGORY_SLUGS) add({view: 'shop', cat});
    for (const product of VF_PRODUCTS) add({view: 'product', id: product.id});
    for (const post of VF_POSTS) add({view: 'post', post: post.id}, post.publishedAt);
    for (const id of VF_POLICIES) add({view: 'policy', id});
  }
  return routes;
}

// The sitemap for a store at `origin`: every indexed address, each with the same page in every
// language the store offers as hreflang alternates (x-default is the English one, or the only one,
// as in the page's <head>) and its lastmod when known (deployment/sitemap.xml is its sample).
export function storefrontSitemap(origin) {
  const app = origin + vfAppBase();
  const indexed = storefrontRoutes().filter(route => route.indexed);
  const languages = new Map();
  for (const route of indexed) {
    if (!languages.has(route.page)) languages.set(route.page, {});
    languages.get(route.page)[route.lang] = app + route.path;
  }
  const entries = indexed.map(route => {
    const alternates = languages.get(route.page);
    const links =
      Object.keys(alternates).length > 1
        ? [
            ...Object.entries(alternates),
            ['x-default', alternates.en || alternates[route.lang]]
          ].map(
            ([hreflang, href]) =>
              '\n  <xhtml:link rel="alternate" hreflang="' + hreflang + '" href="' + href + '"/>'
          )
        : [];
    return (
      '<url>\n  <loc>' +
      app +
      route.path +
      '</loc>' +
      (route.lastmod ? '\n  <lastmod>' + route.lastmod + '</lastmod>' : '') +
      links.join('') +
      '\n</url>'
    );
  });
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    entries.join('\n') +
    '\n</urlset>\n'
  );
}
