// Page behavior. Edit here, then run npm --prefix apps/florist run build.
import {VF_JCATS, VF_POSTS} from '../../i18n/journal-content.js';
import {vfJournalImage} from '../../shared/domain/journal-images.js';
import {vfSeparator} from '../../shared/domain/formatting.js';
import {vfCopy, vfPostHead} from './copy.js';
import {vfProduct, vfProductImage} from '../../shared/domain/catalog.js';
import {vfShell} from '../../shared/services/navigation.js';
import {vfPageRoute, vfRouteUrl} from '../../shared/services/routing.js';
import {useLifecycle, usePageLogic} from '../../shared/services/page-state.js';
import {useStorefrontPage} from '../../shared/services/page-lifecycle.js';
import {vfAbsoluteUrl} from '../../shared/platform/environment.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePost(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      copied: false
    };
  });
  useStorefrontPage(page);
  useLifecycle(page, {
    didMount() {
      // The share link needs this site's origin, which the build's prerender doesn't know.
      page.setState({mounted: true});
    },
    willUnmount() {
      clearTimeout(page._t);
    }
  });
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'post');
  const fa = S.fa;
  const L = S.lang;
  const C = vfCopy(S);
  const id = vfPageRoute(page.props).post || 'morning-at-the-studio',
    post = VF_POSTS.find(p => p.id === id),
    missing = id !== 'morning-at-the-studio' && !post,
    loading = vfPageRoute(page.props).demo === 'loading';
  const cover = post && vfJournalImage(post.image);
  page.head = vfPostHead(post, L, cover);
  // Everything the article shows is the post's own; the page copy holds only its chrome.
  const classic = post && !post.body ? post.classic?.[L] : undefined;
  if (post) {
    C.title = post[L][0];
    C.lede = post[L][1];
    C.meta = post[L].slice(2).join(vfSeparator(L));
    C.quote = classic?.quote;
    C.h2 = classic?.heading;
    if (post.shop?.[L]) C.shopIt = post.shop[L];
  }
  return {
    migration: C.migration,
    missing,
    loading,
    hasPost: !missing && !loading,
    ...S,
    t: {
      ...S.t,
      ...C
    },
    hasBlocks: !!post?.body,
    hasClassic: !!classic,
    image: vfJournalImage(post?.image),
    blocks: (post?.body?.[L] || []).map(([type, value, caption]) => ({
      paragraph: type === 'p',
      heading: type === 'h',
      quote: type === 'quote',
      image: type === 'img',
      tips: type === 'tips',
      value,
      caption,
      photo:
        type === 'img' ? vfJournalImage(typeof value === 'string' ? value : value.src) : undefined
    })),
    storyProducts: (post?.products || []).map(id => {
      const p = vfProduct(id);
      return {
        ...S.productLink(id),
        name: p.id,
        price: S.m(p.price),
        stock: p.stock,
        images: [vfProductImage(p, L)]
      };
    }),
    shareWa:
      'https://wa.me/?text=' +
      encodeURIComponent(
        page.state.mounted
          ? vfAbsoluteUrl(vfRouteUrl({lang: L, view: 'post', post: id}))
          : vfRouteUrl({lang: L, view: 'post', post: id})
      ),
    paras1: classic?.before || [],
    paras2: classic?.after || [],
    copyLabel: page.state.copied ? C.copied : C.copy,
    copy: () => {
      try {
        navigator.clipboard.writeText(location.href);
      } catch {}
      page.setState({
        copied: true
      });
      clearTimeout(page._t);
      page._t = setTimeout(
        () =>
          page.setState({
            copied: false
          }),
        1600
      );
    },
    related: VF_POSTS.filter(p => p.id !== id)
      .slice(0, 3)
      .map(p => {
        const c = VF_JCATS.find(x => x[0] === p.cat);
        return {
          href: vfRouteUrl({
            view: 'post',
            post: p.id,
            lang: L
          }),
          title: p[L][0],
          image: vfJournalImage(p.image),
          excerpt: p[L][1],
          meta: (fa ? c[2] : c[1]) + vfSeparator(L) + p[L][2]
        };
      })
  };
}
