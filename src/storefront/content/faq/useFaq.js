// Page behavior. Edit here, then run npm run build.
import {vfCopy} from './copy.js';
import {vfShell} from '../../shell/shell-props.js';
import {usePageLogic} from '../../shell/page-state.js';
import {useStorefrontPage} from '../../shell/page-lifecycle.js';
import {vfFaqData} from '../../shell/structured-data.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function useFaq(props) {
  const page = usePageLogic(props, page => {});
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
  useStorefrontPage(page, 'faq', {structuredData: [vfFaqData(groups)]});
  return {
    ...S,
    t: {
      ...S.t,
      ...C
    },
    groups
  };
}
