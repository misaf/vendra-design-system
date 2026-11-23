// Page behavior. Edit here, then run npm run build.
import React from 'react';
import {VF_JCATS, VF_POSTS} from '../../journal-content.js';
import {vfJournalImage} from '../../journal-images.js';
import {vfSeparator} from '../../../pricing/formatting.js';
import {vfCopy, vfPostHead} from './copy.js';
import {vfProduct, vfProductImage} from '../../../catalog/catalog.js';
import {vfShell} from '../../../shell/shell-props.js';
import {vfPageRoute, vfRouteUrl} from '../../../shell/routing.js';
import {usePageLogic} from '../../../shell/page-state.js';
import {useStorefrontPage} from '../../../shell/page-lifecycle.js';

// The static export doesn't know which origin will serve it. Hydrate the relative share link first.
const subscribeToOrigin = () => () => {};
const getBrowserOrigin = () => location.origin;
const getPrerenderOrigin = () => '';

function usePostClipboard() {
  const [status, setStatus] = React.useState('copy');
  const request = React.useRef(null);
  const resetTimer = React.useRef(null);
  React.useEffect(
    () => () => {
      request.current?.abort();
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
    },
    []
  );

  async function copy() {
    request.current?.abort();
    const attempt = new AbortController();
    request.current = attempt;
    let result;
    try {
      await navigator.clipboard.writeText(location.href);
      result = 'copied';
    } catch {
      result = 'copyFailed';
    }
    if (attempt.signal.aborted) return;
    setStatus(result);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus('copy'), 1600);
  }

  return {status, copy};
}

export function usePost(props) {
  const page = usePageLogic(props);
  const S = vfShell(page, 'post');
  const fa = S.fa;
  const L = S.lang;
  const C = vfCopy(S);
  const route = vfPageRoute(props);
  const id = route.post || 'morning-at-the-studio',
    post = VF_POSTS.find(p => p.id === id),
    missing = id !== 'morning-at-the-studio' && !post,
    loading = route.demo === 'loading';
  const cover = post && vfJournalImage(post.image);
  useStorefrontPage(page, vfPostHead(post, L, cover) ?? undefined);

  const origin = React.useSyncExternalStore(
    subscribeToOrigin,
    getBrowserOrigin,
    getPrerenderOrigin
  );
  const articlePath = vfRouteUrl({lang: L, view: 'post', post: id});
  const shareUrl = origin ? new URL(articlePath, origin).href : articlePath;
  const {status, copy} = usePostClipboard();
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
    shareWa: 'https://wa.me/?text=' + encodeURIComponent(shareUrl),
    paras1: classic?.before || [],
    paras2: classic?.after || [],
    copyLabel: C[status],
    copy,
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
