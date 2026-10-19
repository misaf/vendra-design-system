// Page behavior. Edit here, then run npm --prefix templates run build.
import {VF_JCATS, VF_POSTS} from '../_shared/translations/journal-content.js';
import {vfJournalImage} from '../_shared/journal-images.js';
import {vfSeparator} from '../_shared/formatting.js';
import {vfCopy} from './copy.js';
import {vfProduct, vfProductImage} from '../_shared/catalog.js';
import {vfShell} from '../_shared/navigation.js';
import {vfPageRoute, vfRouteParams} from '../_shared/routing.js';
import {useLifecycle, usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      copied: false
    };
  });
  useStorefrontPage(page);
  useLifecycle(page, {
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
  if (post) {
    C.title = post[L][0];
    C.lede = post[L][1];
    C.meta = post[L].slice(2).join(vfSeparator(L));
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
    hasClassic: !post?.body,
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
    shareWa: 'https://wa.me/?text=' + encodeURIComponent(location.href),
    paras1: C.p1,
    paras2: C.p2,
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
          href:
            S.href.post.split('?')[0] +
            vfRouteParams({
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
