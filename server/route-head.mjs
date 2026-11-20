// Metadata comes from the same localized copy and catalog as the route's React view.
import {vfFindProduct} from '../domain/catalog.js';
import {VF_FA_DIGITS, VF_MONEY} from '../domain/formatting.js';
import {vfServerRender} from '../shared/platform/environment.js';
import {vfPageHead} from '../shared/services/page-metadata.js';
import {vfReadRoute} from '../shared/services/routing.js';
import {VF_SEO} from '../shared/services/seo.js';
import {vfFaqData, vfFloristData} from '../shared/services/structured-data.js';
import {VF_STORE} from '../domain/store-config.js';
import {VF_POSTS} from '../i18n/journal-content.js';
import theme from '../ui/tokens/tenant-theme.js';
import {vfCopy as bag} from '../app/[locale]/(checkout)/bag/copy.js';
import {vfCopy as contact} from '../app/[locale]/(storefront)/contact/copy.js';
import {vfCopy as error} from '../app/[locale]/(storefront)/error/copy.js';
import {vfCopy as faq} from '../app/[locale]/(storefront)/faq/copy.js';
import {vfCopy as home} from '../app/[locale]/(storefront)/copy.js';
import {vfCopy as journal} from '../app/[locale]/(storefront)/journal/copy.js';
import {vfCopy as missing} from '../app/_not-found/copy.js';
import {vfCopy as policy} from '../app/[locale]/(storefront)/policy/copy.js';
import {vfPostHead} from '../app/[locale]/(storefront)/journal/[post]/copy.js';
import {vfCopy as presentation} from '../app/[locale]/presentation/copy.js';
import {vfProductHead} from '../app/[locale]/(storefront)/product/[code]/copy.js';
import {vfCopy as saved} from '../app/[locale]/(storefront)/saved/copy.js';
import {vfCopy as search} from '../app/[locale]/(storefront)/search/copy.js';
import {vfCopy as shop} from '../app/[locale]/(storefront)/shop/copy.js';
import {vfCopy as signin} from '../app/[locale]/(storefront)/signin/copy.js';
import {vfCopy as track} from '../app/[locale]/(storefront)/track/copy.js';
import {vfCopy as weddings} from '../app/[locale]/(storefront)/weddings/copy.js';

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
  const {default: spec} = await import('../ui/tokens/tenants/' + tenant + '.json', {
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
    if (route.view === 'product') details = vfProductHead(vfFindProduct(route.id), lang);
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
      {
        props: {lang, tenant: VF_STORE.tenant, routeInfo: route},
        _vfPage: route.view,
        head: details
      },
      title
    );
    return {tags: VF_SEO.headTags(head), route};
  } finally {
    vfServerRender(null);
  }
}
