// Page behavior. Edit here, then run npm --prefix apps/storefront run build.
import {vfCopy} from './copy.js';
import {vfShell} from '../_shared/services/navigation.js';
import {usePageLogic} from '../_shared/services/page-state.js';
import {useStorefrontPage} from '../_shared/services/page-lifecycle.js';
import {vfFaqData} from '../_shared/services/structured-data.js';
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
  const groups = C.groups.map(([id, title, items]) => ({
    id: 'faq-' + id,
    title,
    open: id === 'delivery' ? 'zones' : undefined,
    items: items.map(([id, title, content]) => ({
      id,
      title,
      content
    }))
  }));
  // Search engines read the questions and answers as an FAQPage (structured-data.js).
  page.head = {structuredData: [vfFaqData(groups)]};
  return {
    ...S,
    t: {
      ...S.t,
      ...C
    },
    groups
  };
}
