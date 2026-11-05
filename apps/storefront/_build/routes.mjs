// Every page of the storefront that has an address of its own, as paths under the app's path
// (en/shop/boxes/). The production build writes the app's page at each of them, so a static host
// serves every address directly; `indexed` marks the ones search engines may list (the sitemap).
import {VF_POLICIES, VF_ROUTES, vfAppBase, vfRouteUrl} from '../_shared/routing.js';
import {VF_PRODUCTS} from '../_shared/catalog.js';
import {VF_POSTS} from '../_shared/translations/journal-content.js';
import {VF_CATEGORY_SLUGS} from '../_shared/product-categories.js';
import {VF_STORE, vfFeatures} from '../_shared/store-config.js';
import {VF_SEO} from '../_shared/seo.js';

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
    const add = route => {
      if (!offered(route.view)) return;
      // The first policy also has its own address (policy/shipping/); list that one.
      const indexed =
        !VF_SEO.isNoindex(route.view) &&
        route.view !== 'signin' &&
        !(route.view === 'policy' && !route.id);
      routes.push({path: vfRouteUrl({lang, ...route}).slice(vfAppBase().length), indexed});
    };
    for (const view of VF_ROUTES.filter(view => !DYNAMIC.has(view))) add({view});
    for (const cat of VF_CATEGORY_SLUGS) add({view: 'shop', cat});
    for (const product of VF_PRODUCTS) add({view: 'product', id: product.id});
    for (const post of VF_POSTS) add({view: 'post', post: post.id});
    for (const id of VF_POLICIES) add({view: 'policy', id});
  }
  return routes;
}

// The sitemap for a store at `origin`: every indexed address (deployment/sitemap.xml is its sample).
export function storefrontSitemap(origin) {
  const app = origin + vfAppBase();
  const entries = storefrontRoutes()
    .filter(route => route.indexed)
    .map(route => '<url><loc>' + app + route.path + '</loc></url>');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries.join('\n') +
    '\n</urlset>\n'
  );
}
