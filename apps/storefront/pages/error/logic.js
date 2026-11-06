// Page behavior. Edit here, then run npm --prefix apps/storefront run build.
// The server-error page (500): what a tenant's server shows when it can't build a page, and what
// the app shows when the API is down. It offers a retry, the way home, and the phone, so an order
// can still be placed.
import {vfCopy} from './copy.js';
import {vfShell} from '../../shared/services/navigation.js';
import {usePageLogic} from '../../shared/services/page-state.js';
import {useStorefrontPage} from '../../shared/services/page-lifecycle.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {});
  useStorefrontPage(page);
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'error');
  const C = vfCopy(S);
  return {
    ...S,
    t: {
      ...S.t,
      ...C,
      // The number stays left to right inside a Persian sentence.
      call: C.call.replace('{phone}', '\u2066' + S.phoneLabel + '\u2069')
    },
    retry: () => location.reload()
  };
}
