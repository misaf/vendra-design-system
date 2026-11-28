// Metadata comes from the same localized copy and catalog as the route's React view.
import {readDemoProduct} from '../../demo/catalog.mjs';
import {VF_FA_DIGITS, VF_MONEY} from '../../storefront/pricing/formatting.js';
import {vfServerRender} from '../../platform/browser/environment.js';
import {vfPageHead} from '../../storefront/shell/page-metadata.js';
import {vfReadRoute} from '../../storefront/shell/routing.js';
import {VF_SEO} from '../../storefront/shell/seo.js';
import {vfFaqData, vfFloristData} from '../../storefront/shell/structured-data.js';
import {VF_STORE} from '../../storefront/store/store-config.js';
import {VF_POSTS} from '../../storefront/content/journal-content.js';
import theme from '../../design-system/tokens/tenant-theme.js';
import {vfCopy as bag} from '../../storefront/cart/bag/copy.js';
import {vfCopy as contact} from '../../storefront/content/contact/copy.js';
import {vfCopy as error} from '../../storefront/shell/error/copy.js';
import {vfCopy as faq} from '../../storefront/content/faq/copy.js';
import {vfCopy as home} from '../../storefront/catalog/home/copy.js';
import {vfCopy as journal} from '../../storefront/content/journal/copy.js';
import {vfCopy as missing} from '../../storefront/shell/not-found/copy.js';
import {vfCopy as policy} from '../../storefront/content/policy/copy.js';
import {vfPostHead} from '../../storefront/content/journal/post/copy.js';
import {vfCopy as presentation} from '../../storefront/presentation/copy.js';
import {vfProductHead} from '../../storefront/catalog/product/copy.js';
import {vfCopy as saved} from '../../storefront/customer/saved/copy.js';
import {vfCopy as search} from '../../storefront/catalog/search/copy.js';
import {vfCopy as shop} from '../../storefront/catalog/shop/copy.js';
import {vfCopy as signin} from '../../storefront/customer/sign-in/copy.js';
import {vfCopy as track} from '../../storefront/orders/tracking/copy.js';
import {vfCopy as weddings} from '../../storefront/content/weddings/copy.js';

const heading = (copy, title = 'hA', accent = 'hB') =>
  [copy[title], copy[accent]].filter(Boolean).join(' ');

const descriptions = {
  account: copy => heading(signin(copy), 'inA', 'inB'),
  bag: copy => heading(bag(copy), 'titleA', 'titleB'),
  checkout: copy => heading(bag(copy), 'deliveryA', 'deliveryB'),
  contact: copy => heading(contact(copy)),
  error: copy => heading(error(copy)),
  faq: copy => heading(faq(copy), 'titleA', 'titleB'),
  home: copy => heading(home(copy), 'title', 'titleAccent'),
  journal: copy => heading(journal(copy)),
  notfound: copy => heading(missing(copy)),
  policy: (copy, route) => policy(copy).docs[route.id || 'shipping'].title,
  presentation: copy => presentation(copy).title,
  product: (copy, route) => route.id,
  saved: copy => heading(saved(copy)),
  search: copy => search(copy).label,
  shop: copy => heading(shop(copy), 'titleA', 'titleB'),
  signin: copy => heading(signin(copy), 'inA', 'inB'),
  track: copy => heading(track(copy).lookup, 'titleA', 'titleB'),
  weddings: copy => heading(weddings(copy))
};

export async function tenantFontUrls(tenant, lang, base = '/') {
  if (!tenant || tenant === 'default') return [];
  const {default: spec} = await import('../../design-system/tokens/tenants/' + tenant + '.json', {
    with: {type: 'json'}
  });
  return theme.fontPreloads(spec, lang, base);
}

/** @param {string} path
 * @param {{base?: string, origin?: string, lang?: 'en' | 'fa'}} [options]
 */
export function routeHead(path, {base = '/', origin = '', lang: fallbackLang} = {}) {
  const url = base + path;
  // These helpers run synchronously. The address is cleared before React renders the route.
  vfServerRender({url, base, origin});
  try {
    const route = vfReadRoute(url);
    const post =
      route.view === 'post' ? VF_POSTS.find(entry => entry.id === route.post) : undefined;
    if (route.view === 'post' && !post) route.view = 'notfound';
    const lang = route.lang || fallbackLang || VF_STORE.languages[0];
    const fa = lang === 'fa';
    const copy = {
      lang,
      fa,
      n: value => (fa ? VF_FA_DIGITS(value) : String(value)),
      m: value => VF_MONEY(value, fa)
    };
    const title =
      post?.[lang][0] || descriptions[route.view]?.(copy, route) || descriptions.notfound(copy);
    let details;
    if (route.view === 'product') {
      const fixture = readDemoProduct(route.id, lang);
      if (fixture)
        details = vfProductHead(
          fixture.product,
          lang,
          fixture.details.description?.paragraphs[0] ?? ''
        );
    }
    if (post) details = vfPostHead(post, lang);
    if (route.view === 'home' || route.view === 'contact')
      details = {structuredData: [vfFloristData(lang)]};
    if (route.view === 'faq')
      details = {
        structuredData: [
          vfFaqData(
            faq(copy).groups.map(([, , items]) => ({
              items: items.map(([, title, content]) => ({title, content}))
            }))
          )
        ]
      };
    const head = vfPageHead(
      {lang, tenant: VF_STORE.tenant, routeInfo: route},
      route.view,
      title,
      details
    );
    return {tags: VF_SEO.headTags(head), route};
  } finally {
    vfServerRender(null);
  }
}
