// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {VF_FA_DIGITS} from '../_shared/formatting.js';
import {vfShell} from '../_shared/navigation.js';
import {VF_POLICIES, vfPageRoute} from '../_shared/routing.js';
import {usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {});
  useStorefrontPage(page);
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'policy');
  const L = S.lang;
  // A standalone page can be given props.doc; the site opens ?view=policy&id=<doc>.
  const id = page.props.doc ?? vfPageRoute(page.props).id ?? VF_POLICIES[0];
  const C = vfCopy(S);
  const d = C.docs[id] || C.docs[VF_POLICIES[0]];
  return {
    ...S,
    t: {
      ...S.t,
      ...C
    },
    doc: {
      title: d.title,
      intro: d.intro,
      sections: d.sections.map((x, i) => ({
        id: 's' + (i + 1),
        href: '#s' + (i + 1),
        title: (L === 'fa' ? VF_FA_DIGITS(i + 1) : i + 1) + '. ' + x.title,
        paras: (x.paras || []).map(text => ({text})),
        hasItems: !!(x.items && x.items.length),
        items: (x.items || []).map(text => ({text}))
      }))
    }
  };
}
