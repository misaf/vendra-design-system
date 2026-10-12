// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {vfShell} from '../_shared/navigation.js';
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
  const S = vfShell(page, 'faq');
  const C = vfCopy(S);
  return {
    ...S,
    t: {
      ...S.t,
      ...C
    },
    groups: C.groups.map(([id, title, items]) => ({
      id: 'faq-' + id,
      title,
      open: id === 'delivery' ? 'zones' : undefined,
      items: items.map(([id, title, content]) => ({
        id,
        title,
        content
      }))
    }))
  };
}
