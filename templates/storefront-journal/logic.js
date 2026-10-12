// Page behavior. Edit here, then run npm --prefix templates run build.
import {VF_JCATS, VF_POSTS} from '../_shared/translations/journal-content.js';
import {vfCopy} from './copy.js';
import {vfShell} from '../_shared/navigation.js';
import {vfPageRoute, vfRouteParams} from '../_shared/routing.js';
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
  const list = VF_POSTS.filter(
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
      excerpt: p[L][1],
      meta: (fa ? c[2] : c[1]) + ' · ' + p[L][3] + ' · ' + p[L][2]
    };
  });
  return {
    ...S,
    migration: C.migration,
    q: s.q,
    setQ: value =>
      page.setState({
        q: value
      }),
    clear: () =>
      page.setState({
        q: '',
        cat: 'all'
      }),
    loading: vfPageRoute(page.props).demo === 'loading',
    noStories: !list.length,
    leadLayout: S.mob ? 'stack' : 'wide',
    t: {
      ...S.t,
      ...C
    },
    cats: [...VF_JCATS, ['updates', 'Updates', 'خبرها']].map(c => ({
      label: fa ? c[2] : c[1],
      on: s.cat === c[0],
      pick: () =>
        page.setState({
          cat: c[0]
        })
    })),
    hasLead: vfPageRoute(page.props).demo !== 'loading' && list.length > 0,
    lead: list[0] || {},
    rest: vfPageRoute(page.props).demo === 'loading' ? [] : list.slice(1)
  };
}
