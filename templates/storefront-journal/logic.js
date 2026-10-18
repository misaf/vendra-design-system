// Page behavior. Edit here, then run npm --prefix templates run build.
import {VF_JCATS, VF_POSTS} from '../_shared/translations/journal-content.js';
import {vfJournalImage} from '../_shared/journal-images.js';
import {vfCopy} from './copy.js';
import {vfShell} from '../_shared/navigation.js';
import {vfPageRoute, vfRouteParams} from '../_shared/routing.js';
import {VF_STORE} from '../_shared/store-config.js';
import {usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      cat: 'all',
      q: ''
    };
  });
  useStorefrontPage(page);
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'journal');
  const fa = S.fa;
  const L = S.lang;
  const s = page.state;
  const C = vfCopy(S);
  const route = vfPageRoute(page.props);
  const all = VF_POSTS.filter(
    p =>
      (s.cat === 'all' || p.cat === s.cat) &&
      (!s.q || p[L].join(' ').toLowerCase().includes(s.q.toLowerCase()))
  ).map(p => {
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
      meta: (fa ? c[2] : c[1]) + ' · ' + p[L][3] + ' · ' + p[L][2]
    };
  });
  // One page of posts (?page=2); a page past the end shows the last one.
  const size = VF_STORE.journalPageSize;
  const pageCount = Math.max(1, Math.ceil(all.length / size));
  const current = Math.min(route.page || 1, pageCount);
  const list = all.slice((current - 1) * size, current * size);
  const pageHref = number =>
    S.href.journal.split('?')[0] + vfRouteParams({view: 'journal', lang: L, page: number});
  // A new filter or search starts again from the first page, replacing the history entry.
  const firstPage = () => {
    if (current > 1 && page.props.go) page.props.go({view: 'journal', lang: L}, true);
  };
  return {
    ...S,
    migration: C.migration,
    q: s.q,
    setQ: value => {
      page.setState({
        q: value
      });
      firstPage();
    },
    clear: () => {
      page.setState({
        q: '',
        cat: 'all'
      });
      firstPage();
    },
    loading: route.demo === 'loading',
    noStories: !all.length,
    t: {
      ...S.t,
      ...C
    },
    cats: [...VF_JCATS, ['updates', 'Updates', 'خبرها']].map(c => ({
      label: fa ? c[2] : c[1],
      on: s.cat === c[0],
      pick: () => {
        page.setState({
          cat: c[0]
        });
        firstPage();
      }
    })),
    // The first page leads with a featured story; later pages are all in the grid.
    hasLead: route.demo !== 'loading' && current === 1 && list.length > 0,
    lead: list[0] || {},
    rest: route.demo === 'loading' ? [] : current === 1 ? list.slice(1) : list,
    paging: {
      page: current,
      pageCount: route.demo === 'loading' ? 1 : pageCount,
      href: pageHref,
      // In the site, a page changes in place (the router scrolls to the top).
      onChange: page.props.go
        ? number => page.props.go({view: 'journal', lang: L, page: number})
        : undefined
    }
  };
}
