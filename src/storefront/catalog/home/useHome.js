import React from 'react';
import {vfSavedItems} from '../../customer/saved-items.js';
import {VF_NAV} from '../../../platform/browser/page-focus.js';
import {vfCopy} from './copy.js';
import {VF_PRODUCTS, vfProductBadge, vfProductImage, vfProductSub} from '../catalog.js';
import {VF_MONEY, vfSeparator} from '../../pricing/formatting.js';
import {vfAccountLoad, vfAccountPhone} from '../../customer/account-data.js';
import {vfShell} from '../../shell/shell-props.js';
import {vfRouteUrl} from '../../shell/routing.js';
import {VF_CATEGORY_COPY, VF_SHOP_OCCASIONS, VF_SHOP_OCCASION_COPY} from '../categories.js';
import {VF_CATEGORY_SLUGS} from '../product-categories.js';
import {vfCategoryImage} from '../category-images.js';
import {vfJournalImage} from '../../content/journal-images.js';
import {VF_STORE, vfLiveStore} from '../../store/store-config.js';
import {VF_JCATS, VF_POSTS} from '../../content/journal-content.js';
import {usePageLogic} from '../../shell/page-state.js';
import {useStorefrontPage} from '../../shell/page-lifecycle.js';
import {vfFloristData} from '../../shell/structured-data.js';
import {useListImpressions, vfSelectItem} from '../../../platform/browser/list-tracking.js';
import {vfStoredValue} from '../../../platform/browser/environment.js';
import {vfRuntime} from '../../../platform/browser/runtime.js';

export function useHome(props) {
  const page = usePageLogic(props, () => {});
  useStorefrontPage(page, 'home', {
    structuredData: [vfFloristData(props.lang === 'fa' ? 'fa' : 'en')]
  });
  const fa = page.props.lang === 'fa';
  const L = fa ? 'fa' : 'en';
  const savedItems = vfSavedItems(page);
  const S = vfShell(page, 'home');
  const C = vfCopy(S);
  const newsletter = useNewsletter(S.features.newsletter && props.ready !== false, C, L);
  const inStock = VF_PRODUCTS.filter(p => p.inStock !== false);
  const featured = VF_STORE.featuredProducts
    .map(id => inStock.find(p => p.id === id))
    .filter(Boolean);
  const others = inStock.filter(p => !featured.includes(p));
  const studio = others.length >= 4 ? others : inStock;
  useListImpressions('home_featured', featured);
  useListImpressions('home_studio', studio);
  const card = list => (p, index) => ({
    select: vfSelectItem(list, p, index),
    fav: savedItems.ids.includes(p.id),
    toggleFav: () => savedItems.toggle(p.id),
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
    newsletter: S.features.newsletter && newsletter
  };
}

function useNewsletter(readCustomerData, copy, lang) {
  const [submission, setSubmission] = React.useState(
    /** @type {{draft?: string, sending?: boolean, done?: string, error?: 'invalid' | 'failed'}} */ ({})
  );
  const pending = React.useRef(false);
  const signedUp = submission.done || (readCustomerData && vfStoredValue('vf-newsletter')) || '';
  const accountPhone = readCustomerData && vfAccountPhone();
  const profile = accountPhone ? vfAccountLoad(accountPhone, lang).profile : {};
  const draft = submission.draft ?? profile.email ?? '';

  React.useEffect(() => {
    // Only focus a new confirmation, after it has rendered. Reloads restore it without moving focus.
    if (submission.done) document.getElementById('vf-news-done')?.focus();
  }, [submission.done]);

  return {
    open: !signedUp,
    done: !!signedUp,
    doneText: (vfLiveStore() ? copy.newsDone : copy.newsDemo).replace(
      '{email}',
      '\u2066' + signedUp + '\u2069'
    ),
    draft,
    sending: !!submission.sending,
    error: submission.error && {invalid: copy.newsError, failed: copy.newsFailed}[submission.error],
    setDraft: value => setSubmission(current => ({...current, draft: value, error: undefined})),
    submit: async event => {
      event?.preventDefault();
      // An Enter press can submit again before React commits the disabled button.
      if (pending.current) return;
      const email = draft.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setSubmission({...submission, draft, error: 'invalid'});
        VF_NAV.focusById('vf-news-email');
        return;
      }
      const api = vfRuntime.api;
      if (!api) return;
      pending.current = true;
      setSubmission({...submission, draft, error: undefined, sending: true});
      try {
        await api.newsletter(email, profile.name);
      } catch {
        setSubmission(current => ({...current, sending: false, error: 'failed'}));
        VF_NAV.focusById('vf-news-email');
        return;
      } finally {
        pending.current = false;
      }
      try {
        localStorage.setItem('vf-newsletter', email);
      } catch {}
      vfRuntime.track?.event('generate_lead', {lead_source: 'newsletter'});
      setSubmission({done: email});
    }
  };
}
