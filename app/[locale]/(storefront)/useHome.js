// Page behavior. Edit here, then run npm run build.
import {vfCopy} from './copy.js';
import {
  VF_PRODUCTS,
  vfProductBadge,
  vfProductImage,
  vfProductSub
} from '../../../src/storefront/catalog/catalog.js';
import {VF_MONEY, vfSeparator} from '../../../src/storefront/pricing/formatting.js';
import {vfAccountLoad, vfAccountPhone} from '../../../src/storefront/customer/account-data.js';
import {vfShell, vfStored} from '../../../shared/services/navigation.js';
import {vfRouteUrl} from '../../../shared/services/routing.js';
import {
  VF_CATEGORY_COPY,
  VF_SHOP_OCCASIONS,
  VF_SHOP_OCCASION_COPY
} from '../../../src/storefront/catalog/categories.js';
import {VF_CATEGORY_SLUGS} from '../../../src/storefront/catalog/product-categories.js';
import {vfCategoryImage} from '../../../src/storefront/catalog/category-images.js';
import {vfJournalImage} from '../../../src/storefront/content/journal-images.js';
import {VF_STORE, vfLiveStore} from '../../../src/storefront/store/store-config.js';
import {VF_JCATS, VF_POSTS} from '../../../src/storefront/content/journal-content.js';
import {usePageLogic} from '../../../shared/services/page-state.js';
import {useStorefrontPage} from '../../../shared/services/page-lifecycle.js';
import {vfFloristData} from '../../../shared/services/structured-data.js';
import {vfSelectItem, vfShowList} from '../../../shared/services/list-tracking.js';
import {vfRuntime} from '../../../shared/platform/runtime.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function useHome(props) {
  const page = usePageLogic(props, page => {});
  useStorefrontPage(page);
  return vals(page);
}

function vals(page) {
  const fa = page.props.lang === 'fa';
  const L = fa ? 'fa' : 'en';
  const S = vfShell(page, 'home');
  // Search engines read the studio's address, hours and phone as a Florist (structured-data.js).
  page.head = {structuredData: [vfFloristData(L)]};
  const C = vfCopy(S);
  const inStock = VF_PRODUCTS.filter(p => p.inStock !== false);
  const featured = VF_STORE.featuredProducts
    .map(id => inStock.find(p => p.id === id))
    .filter(Boolean);
  const others = inStock.filter(p => !featured.includes(p));
  const studio = others.length >= 4 ? others : inStock;
  vfShowList(page, 'home_featured', featured);
  vfShowList(page, 'home_studio', studio);
  const card = list => (p, index) => ({
    select: vfSelectItem(list, p, index),
    fav: S.isFav(p.id, []),
    toggleFav: S.toggleFav(p.id, []),
    ...S.productLink(p.id),
    images: [vfProductImage(p, L)],
    name: p.id,
    sub: vfProductSub(p, L),
    badge: vfProductBadge(p, L),
    price: VF_MONEY(p.price, fa),
    stock: p.stock
  });
  return {
    ...S,
    frame: page.props.frame ?? 'soft',
    t: {
      ...S.t,
      ...C
    },
    // The shop's categories, in the store's order, as the round row at the top.
    categories: VF_CATEGORY_SLUGS.map(slug => ({
      ...S.shopLink(slug),
      label: VF_CATEGORY_COPY[L][slug],
      image: vfCategoryImage(slug)
    })),
    occasions: VF_SHOP_OCCASIONS.map(id => {
      const designs = VF_PRODUCTS.filter(product => product.occasions.includes(id));
      return {
        ...S.occasionLink(id),
        label: VF_SHOP_OCCASION_COPY[L][id],
        count: C.designCount(designs.length),
        image: designs.length ? vfProductImage(designs[0], L) : undefined
      };
    }),
    // The studio's ready-made designs, in its order; the studio collection leaves them
    // out while at least four other designs remain (a small catalogue shows them all).
    featured: featured.map(card('home_featured')),
    readyHref: vfRouteUrl({view: 'shop', lang: L, cat: 'all', filters: ['ready']}),
    products: studio.map(card('home_studio')),
    weddings: S.features.weddings ? {href: S.href.weddings} : null,
    // The latest journal posts, newest first as the journal lists them.
    posts: S.features.journal
      ? VF_POSTS.slice(0, VF_STORE.homePosts).map(post => {
          const category = VF_JCATS.find(item => item[0] === post.cat);
          return {
            href: vfRouteUrl({view: 'post', post: post.id, lang: L}),
            title: post[L][0],
            image: vfJournalImage(post.image),
            excerpt: post[L][1],
            meta: (fa ? category[2] : category[1]) + vfSeparator(L) + post[L][3]
          };
        })
      : [],
    newsletter: S.features.newsletter && newsletter(page, S, C, L)
  };
}

// The newsletter band: the draft lives in page state; a finished sign-up is remembered on this device.
function newsletter(page, S, C, L) {
  const news = page.state.vfNews || {};
  const signedUp = news.done || vfStored('vf-newsletter');
  const accountPhone = vfAccountPhone();
  const profile = accountPhone ? vfAccountLoad(accountPhone, L).profile : {};
  const draft = news.draft ?? profile.email ?? '';
  return {
    open: !signedUp,
    done: !!signedUp,
    doneText: (vfLiveStore() ? C.newsDone : C.newsDemo).replace(
      '{email}',
      '\u2066' + signedUp + '\u2069'
    ),
    draft,
    sending: !!news.sending,
    error: news.error || undefined,
    setDraft: value => page.setState({vfNews: {...news, draft: value, error: ''}}),
    submit: event => {
      event && event.preventDefault && event.preventDefault();
      if (news.sending) return;
      const email = draft.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        page.setState({vfNews: {...news, draft, error: C.newsError}});
        S.focus('vf-news-email');
        return;
      }
      page.setState({vfNews: {...news, draft, error: '', sending: true}});
      vfRuntime.api.newsletter(email, profile.name).then(
        () => {
          try {
            localStorage.setItem('vf-newsletter', email);
          } catch {}
          vfRuntime.track.event('generate_lead', {lead_source: 'newsletter'});
          page.setState({vfNews: {done: email}});
          S.focus('vf-news-done');
        },
        () => {
          page.setState({vfNews: {...news, draft, sending: false, error: C.newsFailed}});
          S.focus('vf-news-email');
        }
      );
    }
  };
}
