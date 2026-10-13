// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {VF_PRODUCTS, vfProductImage, vfProductSub} from '../_shared/catalog.js';
import {VF_ZONES, vfDeliveryCutoff, vfDeliveryDays} from '../_shared/delivery.js';
import {VF_MONEY} from '../_shared/formatting.js';
import {vfShell} from '../_shared/navigation.js';
import {vfRouteParams} from '../_shared/routing.js';
import {vfDayMonth, vfDayName} from '../_shared/translations/time.js';
import {VF_SHOP_OCCASIONS, VF_SHOP_OCCASION_COPY} from '../_shared/translations/categories.js';
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
  const fa = page.props.lang === 'fa';
  const L = fa ? 'fa' : 'en';
  const S = vfShell(page, 'home');
  const C = vfCopy(S);
  // The first delivery day still open in central Karaj: today until its cut-off, otherwise the next.
  const zone = VF_ZONES[0];
  const next = vfDeliveryDays(zone.id).find(day => !day.soldOut && !day.pastCutoff);
  const sameDay = !!next && next.offset === 0;
  const shop = S.href.shop.split('?')[0];
  return {
    ...S,
    frame: page.props.frame ?? 'soft',
    t: {
      ...S.t,
      ...C
    },
    // The band at the top: when an order placed now arrives, and where to shop for it.
    delivery: sameDay
      ? C.sameDay.replace('{time}', vfDeliveryCutoff(zone, fa))
      : next
        ? C.nextDay
            .replace('{day}', vfDayName(next, fa))
            .replace('{date}', vfDayMonth(next.date, fa))
        : '',
    cta: sameDay
      ? {
          label: C.ctaSame,
          href: shop + vfRouteParams({view: 'shop', lang: L, cat: 'all', filters: ['same']})
        }
      : {label: C.cta, href: S.href.shop},
    occasions: VF_SHOP_OCCASIONS.map(id => ({
      ...S.occasionLink(id),
      label: VF_SHOP_OCCASION_COPY[L][id],
      count: C.designCount(VF_PRODUCTS.filter(p => p.occasions.includes(id)).length)
    })),
    products: VF_PRODUCTS.filter(p => p.inStock !== false).map(p => ({
      fav: S.isFav(p.id, []),
      toggleFav: S.toggleFav(p.id, []),
      ...S.productLink(p.id),
      images: [vfProductImage(p, L)],
      name: p.id,
      sub: vfProductSub(p, L),
      badge: p[L].badge,
      price: VF_MONEY(p.price, fa),
      stock: p.stock
    }))
  };
}
