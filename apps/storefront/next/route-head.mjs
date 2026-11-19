// Metadata comes from the same localized copy and catalog as the route's React view.
import {vfFindProduct} from '../shared/domain/catalog.js';
import {VF_FA_DIGITS, VF_MONEY} from '../shared/domain/formatting.js';
import {vfServerRender} from '../shared/platform/environment.js';
import {vfPageHead} from '../shared/services/page-lifecycle.js';
import {vfReadRoute} from '../shared/services/routing.js';
import {VF_SEO} from '../shared/services/seo.js';
import {vfFaqData, vfFloristData} from '../shared/services/structured-data.js';
import {VF_STORE} from '../shared/domain/store-config.js';
import {VF_POSTS} from '../shared/translations/journal-content.js';
import theme from '@vendra/ui/tokens/theme';
import {vfCopy as bag} from '../features/bag/copy.js';
import {vfCopy as contact} from '../features/contact/copy.js';
import {vfCopy as error} from '../features/error/copy.js';
import {vfCopy as faq} from '../features/faq/copy.js';
import {vfCopy as home} from '../features/home/copy.js';
import {vfCopy as journal} from '../features/journal/copy.js';
import {vfCopy as missing} from '../features/notfound/copy.js';
import {vfCopy as policy} from '../features/policy/copy.js';
import {vfPostHead} from '../features/post/copy.js';
import {vfCopy as presentation} from '../features/presentation/copy.js';
import {vfProductHead} from '../features/product/copy.js';
import {vfCopy as saved} from '../features/saved/copy.js';
import {vfCopy as search} from '../features/search/copy.js';
import {vfCopy as shop} from '../features/shop/copy.js';
import {vfCopy as signin} from '../features/signin/copy.js';
import {vfCopy as track} from '../features/track/copy.js';
import {vfCopy as weddings} from '../features/weddings/copy.js';

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
  post: (copy, route) => VF_POSTS.find(post => post.id === route.post)?.[copy.lang][0],
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
  const {default: spec} = await import('../../../packages/ui/tokens/tenants/' + tenant + '.json', {
    with: {type: 'json'}
  });
  return theme.fontPreloads(spec, lang, base);
}

export function routeHead(path, {base = '/', origin = '', lang: fallbackLang} = {}) {
  const url = base + 'apps/storefront/app/' + path;
  // These helpers run synchronously. The address is cleared before React renders the route.
  vfServerRender({url, base, origin});
  try {
    const route = vfReadRoute(url);
    const lang = route.lang || fallbackLang || VF_STORE.languages[0];
    const fa = lang === 'fa';
    const copy = {
      lang,
      fa,
      n: value => (fa ? VF_FA_DIGITS(value) : String(value)),
      m: value => VF_MONEY(value, fa)
    };
    const title = descriptions[route.view]?.(copy, route) || descriptions.notfound(copy);
    let details;
    if (route.view === 'product') details = vfProductHead(vfFindProduct(route.id), lang);
    if (route.view === 'post')
      details = vfPostHead(
        VF_POSTS.find(post => post.id === route.post),
        lang
      );
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
