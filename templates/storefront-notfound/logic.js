// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {VF_PRODUCTS, vfProductImage, vfProductSub} from '../_shared/catalog.js';
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
  const S = vfShell(page, 'notfound');
  const L = S.lang;
  const C = vfCopy(S);
  return {
    ...S,
    t: {
      ...S.t,
      ...C
    },
    items: VF_PRODUCTS.slice(0, 4).map(p => ({
      ...S.productLink(p.id),
      images: [vfProductImage(p, L)],
      name: p.id,
      sub: vfProductSub(p, L),
      price: S.m(p.price),
      stock: p.stock
    }))
  };
}
