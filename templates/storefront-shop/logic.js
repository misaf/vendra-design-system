// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {
  VF_PRODUCTS,
  vfProductBadge,
  vfProductImage,
  vfProductSub,
  vfReady
} from '../_shared/catalog.js';
import {VF_ZONES, vfDeliverableOn, vfDeliveryDays} from '../_shared/delivery.js';
import {VF_FA_DIGITS, VF_MONEY, vfSeparator} from '../_shared/formatting.js';
import {vfShell} from '../_shared/navigation.js';
import {vfPageRoute, vfRouteParams} from '../_shared/routing.js';
import {VF_STORE, vfFeatures} from '../_shared/store-config.js';
import {
  VF_CATEGORY_COPY,
  VF_SHOP_OCCASIONS,
  VF_SHOP_OCCASION_COPY
} from '../_shared/translations/categories.js';
import {vfDayMonth, vfDayName} from '../_shared/translations/time.js';
import {commerce} from '../../components/utils/commerce.js';
import {useLifecycle, usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
import {VF_CATEGORY_SLUGS} from '../_shared/product-categories.js';
const VF_CATS = ['all', ...VF_CATEGORY_SLUGS];
/** @type {[string, (product: any) => boolean][]} */
const VF_CHIPS = [
  ['ready', p => vfReady(p)],
  ['under3', p => p.price < 3000000],
  ['same', p => p.same],
  ['roses', p => p.roses]
];
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      cat: 'all',
      chips: [],
      sort: 'featured',
      favs: ['VF-8RD5WN']
    };
  });
  useStorefrontPage(page);
  useLifecycle(page, {
    didMount() {
      // The Filters dialog belongs to the compact layout (below 1024px, CSS); widening the window
      // to the sidebar closes it.
      page._shopMedia = window.matchMedia('(width >= 1024px)');
      page._shopResize = () => page._shopMedia.matches && page.setState({filterOpen: false});
      page._shopMedia.addEventListener('change', page._shopResize);
    },
    willUnmount() {
      clearTimeout(page._priceTimer);
      page._shopMedia.removeEventListener('change', page._shopResize);
    }
  });
  return vals(page);
}

function vals(page) {
  const fa = page.props.lang === 'fa';
  const L = fa ? 'fa' : 'en';
  const S = vfShell(page, 'shop');
  const n = v => (fa ? VF_FA_DIGITS(v) : String(v));
  const C = vfCopy(S);
  const route = vfPageRoute(page.props);
  const s = {
    cat: route.cat || 'all',
    sort: route.sort || 'featured',
    chips: route.filters || [],
    occasion: route.occasion || 'all',
    date: route.date || ''
  };
  // Delivery days use the main zone's cut-off; a closed or unknown day in the URL is ignored.
  const days = vfDeliveryDays(VF_ZONES[0].id);
  const date = days.some(d => d.iso === s.date && !d.soldOut && !d.pastCutoff) ? s.date : '';
  const dayLabel = d => vfDayName(d, fa) + vfSeparator(fa) + vfDayMonth(d.date, fa);
  // Filters set here are reported as they change; FilterBar reports the ones removed from its row.
  const filterUsed = (filterId, value, on) =>
    window.VF_TRACK.event('filter', {filter_id: filterId, value, action: on ? 'add' : 'remove'});
  const change = patch => {
    const next = {
      ...route,
      view: 'shop',
      lang: L,
      cat: s.cat,
      sort: s.sort,
      filters: s.chips,
      occasion: s.occasion,
      date,
      // A new filter or sort starts again from the first page.
      page: 1,
      ...patch
    };
    // Filters refine this page, so they replace the history entry instead of adding one per tap.
    if (page.props.go) page.props.go(next, true);
    else location.href = S.href.shop.split('?')[0] + vfRouteParams(next);
  };
  const priceMax = Math.ceil(Math.max(...VF_PRODUCTS.map(p => p.price)) / 100000) * 100000;
  const price = [route.min || 0, route.max ?? priceMax],
    inStock = !!route.stock,
    extra = p =>
      p.price >= price[0] &&
      p.price <= price[1] &&
      (!inStock || p.inStock !== false) &&
      (s.occasion === 'all' || p.occasions.includes(s.occasion)) &&
      (!date || vfDeliverableOn(p, date));
  const demo = route.demo;
  const inCat = p => s.cat === 'all' || p.cat === s.cat;
  let list = VF_PRODUCTS.filter(inCat)
    .filter(extra)
    .filter(p => s.chips.every(id => VF_CHIPS.find(c => c[0] === id)[1](p)));
  if (s.sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
  if (s.sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
  const paged = commerce.page(list, route.page, VF_STORE.shopPageSize);
  const activeFilters = [
    ...(s.occasion !== 'all'
      ? [
          {
            id: 'occasion',
            label: VF_SHOP_OCCASION_COPY[L][s.occasion],
            remove: () =>
              change({
                occasion: 'all'
              })
          }
        ]
      : []),
    ...(price[0] > 0 || price[1] < priceMax
      ? [
          {
            id: 'price',
            label: S.m(price[0]) + ' – ' + S.m(price[1]),
            remove: () =>
              change({
                min: 0,
                max: priceMax
              })
          }
        ]
      : []),
    ...(date
      ? [
          {
            id: 'date',
            label: C.deliversOn.replace('{day}', dayLabel(days.find(d => d.iso === date))),
            remove: () =>
              change({
                date: ''
              })
          }
        ]
      : []),
    ...(inStock
      ? [
          {
            id: 'stock',
            label: C.migration.stock,
            remove: () =>
              change({
                stock: false
              })
          }
        ]
      : [])
  ];
  const clear = () =>
    change({
      filters: [],
      cat: 'all',
      sort: 'featured',
      min: 0,
      max: priceMax,
      stock: false,
      occasion: 'all',
      date: ''
    });
  return {
    ...S,
    migration: C.migration,
    filterOpen: !!page.state.filterOpen,
    openFilters: () =>
      page.setState({
        filterOpen: true
      }),
    closeFilters: () =>
      page.setState({
        filterOpen: false
      }),
    // FilterBar moves focus along the filters as they go; after the last one, to the result count.
    activeFilters: activeFilters.map(filter => ({
      id: filter.id,
      label: filter.label,
      onRemove: () => {
        filter.remove();
        if (activeFilters.length === 1) S.focus('vf-shop-count');
      }
    })),
    // The mobile Filters button counts the filters that are on; "Clear all" removes them but keeps the category and sort.
    clearFilters: () => {
      change({
        min: 0,
        max: priceMax,
        stock: false,
        occasion: 'all',
        date: ''
      });
      // The button goes away with the filters, so focus moves to the updated result count
      // (the filters dialog keeps focus while it is open).
      if (!page.state.filterOpen) S.focus('vf-shop-count');
    },
    filtersLabel: activeFilters.length
      ? C.migration.filters + ' (' + n(activeFilters.length) + ')'
      : C.migration.filters,
    price,
    priceMax,
    priceLabels: {
      min: S.fa ? 'حداقل' : 'Minimum',
      max: S.fa ? 'حداکثر' : 'Maximum'
    },
    formatPrice: S.m,
    setPrice: ([min, max]) => {
      change({
        min,
        max
      });
      // The slider reports every step of a drag; the range counts once it rests.
      clearTimeout(page._priceTimer);
      page._priceTimer = setTimeout(() => filterUsed('price', min + '-' + max, true), 800);
    },
    occasionOptions: ['all', ...VF_SHOP_OCCASIONS].map(id => ({
      label: id === 'all' ? VF_CATEGORY_COPY[L].all : VF_SHOP_OCCASION_COPY[L][id],
      on: s.occasion === id,
      pick: () => {
        filterUsed('occasion', id, id !== 'all');
        change({
          occasion: id
        });
      }
    })),
    date,
    dateOptions: [
      {
        value: '',
        label: C.anyDay
      },
      ...days.map(d => ({
        value: d.iso,
        label:
          dayLabel(d) +
          (d.soldOut
            ? vfSeparator(fa) + C.soldOut
            : d.pastCutoff
              ? vfSeparator(fa) + C.closed
              : ''),
        disabled: d.soldOut || d.pastCutoff
      }))
    ],
    setDate: value => {
      filterUsed('date', value || undefined, !!value);
      change({
        date: value
      });
    },
    showResults: C.showResults.replace('{count}', C.designCount(list.length)),
    inStock,
    setStock: value => {
      filterUsed('stock', undefined, !!value);
      change({
        stock: value
      });
    },
    loading: demo === 'loading',
    failed: demo === 'error',
    retry: () =>
      change({
        demo: undefined
      }),
    frame: page.props.frame ?? 'soft',
    t: {
      ...S.t,
      ...C,
      // The open category names the page; "All flowers" otherwise.
      eyebrow: s.cat === 'all' ? C.eyebrow : VF_CATEGORY_COPY[L][s.cat]
    },
    // A category with no designs at all stays out of the filter, unless it's the one open.
    categories: VF_CATS.filter(
      id => id === 'all' || id === s.cat || VF_PRODUCTS.some(p => p.cat === id)
    ).map(id => {
      const on = s.cat === id;
      return {
        label: VF_CATEGORY_COPY[L][id],
        count: n(VF_PRODUCTS.filter(p => (id === 'all' || p.cat === id) && extra(p)).length),
        on,
        off: !on,
        pick: () => {
          filterUsed('category', id, id !== 'all');
          change({
            cat: id
          });
        }
      };
    }),
    // Same-day goes with the store's same-day delivery.
    chips: VF_CHIPS.filter(([id]) => id !== 'same' || vfFeatures().sameDay).map(([id]) => {
      const on = s.chips.includes(id);
      return {
        label: C.chipLabels[id],
        on,
        toggle: () => {
          filterUsed(id, undefined, !on);
          change({
            filters: on ? s.chips.filter(x => x !== id) : [...s.chips, id]
          });
        }
      };
    }),
    sort: s.sort,
    setSort: value =>
      change({
        sort: value
      }),
    sortOptions: C.sortOptions,
    countLabel: C.designCount(list.length),
    paging: {
      shown: paged.shown,
      total: paged.total,
      status: C.showing(paged.shown, paged.total),
      label: C.showMore,
      href:
        S.href.shop.split('?')[0] +
        vfRouteParams({...route, view: 'shop', lang: L, page: paged.page + 1}),
      // Loads the next page in place, then moves focus to its first product.
      onClick: event => {
        if (!page.props.go) return;
        event.preventDefault();
        const first = paged.shown;
        change({page: paged.page + 1});
        setTimeout(() => {
          const links = document.querySelectorAll('.vf-shop-product-grid .ag-product__link');
          links[first] && /** @type {HTMLElement} */ (links[first]).focus();
        }, 0);
      }
    },
    showPaging: paged.total > VF_STORE.shopPageSize,
    hasItems: !demo && list.length > 0,
    noItems: !demo && list.length === 0,
    clear,
    items: paged.items.map(p => {
      const fav = S.isFav(p.id, ['VF-8RD5WN']);
      return {
        ...S.productLink(p.id, {date}),
        images: [vfProductImage(p, L)],
        name: p.id,
        sub: vfProductSub(p, L),
        badge: vfProductBadge(p, L),
        price: VF_MONEY(p.price, fa),
        stock: p.stock,
        fav,
        toggleFav: S.toggleFav(p.id, ['VF-8RD5WN'])
      };
    })
  };
}
