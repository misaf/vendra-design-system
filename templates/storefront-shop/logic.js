// Page behavior. Edit here, then run npm --prefix templates run build.
const VF_CATS = ['all', 'bouquets', 'boxes', 'orchids', 'bridal'];
const VF_CHIPS = [['under3', p => p.price < 3000000], ['same', p => p.same], ['roses', p => p.roses]];
class Component extends VFPage {
  state = {
    cat: 'all',
    chips: [],
    sort: 'featured',
    favs: ['orchid']
  };
  renderVals() {
    const fa = this.props.lang === 'fa';
    const L = fa ? 'fa' : 'en';
    const S = vfShell.call(this, this.props, 'shop');
    const n = v => fa ? VF_FA_DIGITS(v) : String(v);
    const C = vfCopy(S);
    const route = vfPageRoute(this.props);
    const s = {
      cat: route.cat || 'all',
      sort: route.sort || 'featured',
      chips: route.filters || [],
      occasion: route.occasion || 'all'
    };
    const change = patch => {
      const next = {
        ...route,
        view: 'shop',
        lang: L,
        cat: s.cat,
        sort: s.sort,
        filters: s.chips,
        occasion: s.occasion,
        ...patch
      };
      if (this.props.go) this.props.go(next);else location.href = S.href.shop.split('?')[0] + vfRouteParams(next);
    };
    const priceMax = Math.ceil(Math.max(...VF_PRODUCTS.map(p => p.price)) / 100000) * 100000;
    const price = [route.min || 0, route.max ?? priceMax],
      inStock = !!route.stock,
      extra = p => p.price >= price[0] && p.price <= price[1] && (!inStock || p.inStock !== false) && (s.occasion === 'all' || p.occasions.includes(s.occasion));
    const demo = route.demo;
    const inCat = p => s.cat === 'all' || p.cat === s.cat;
    let list = VF_PRODUCTS.filter(inCat).filter(extra).filter(p => s.chips.every(id => VF_CHIPS.find(c => c[0] === id)[1](p)));
    if (s.sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (s.sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    return {
      ...S,
      migration: C.migration,
      filterOpen: !!this.state.filterOpen,
      openFilters: () => this.setState({
        filterOpen: true
      }),
      closeFilters: () => this.setState({
        filterOpen: false
      }),
      activeFilters: [...(s.occasion !== 'all' ? [{
        label: VF_SHOP_OCCASION_COPY[L][s.occasion],
        remove: () => change({
          occasion: 'all'
        })
      }] : []), ...(price[0] > 0 || price[1] < priceMax ? [{
        label: S.m(price[0]) + ' – ' + S.m(price[1]),
        remove: () => change({
          min: 0,
          max: priceMax
        })
      }] : []), ...(inStock ? [{
        label: C.migration.stock,
        remove: () => change({
          stock: false
        })
      }] : [])],
      price,
      priceMax,
      priceLabels: {
        min: C.migration.price + ' — ' + (S.fa ? 'حداقل' : 'minimum'),
        max: C.migration.price + ' — ' + (S.fa ? 'حداکثر' : 'maximum')
      },
      formatPrice: S.m,
      setPrice: ([min, max]) => change({
        min,
        max
      }),
      occasionOptions: ['all', ...VF_SHOP_OCCASIONS].map(id => ({
        label: id === 'all' ? VF_CATEGORY_COPY[L].all : VF_SHOP_OCCASION_COPY[L][id],
        on: s.occasion === id,
        pick: () => change({
          occasion: id
        })
      })),
      inStock,
      setStock: e => change({
        stock: e.target.checked
      }),
      loading: demo === 'loading',
      failed: demo === 'error',
      retry: () => change({
        demo: undefined
      }),
      frame: this.props.frame ?? 'soft',
      t: {
        ...S.t,
        ...C
      },
      categories: VF_CATS.map(id => {
        const on = s.cat === id;
        return {
          label: VF_CATEGORY_COPY[L][id],
          count: n(VF_PRODUCTS.filter(p => (id === 'all' || p.cat === id) && extra(p)).length),
          on,
          off: !on,
          pick: () => change({
            cat: id
          })
        };
      }),
      chips: VF_CHIPS.map(([id]) => {
        const on = s.chips.includes(id);
        return {
          label: C.chipLabels[id],
          on,
          toggle: () => change({
            filters: on ? s.chips.filter(x => x !== id) : [...s.chips, id]
          })
        };
      }),
      sort: s.sort,
      setSort: e => change({
        sort: e.target.value
      }),
      sortOptions: C.sortOptions,
      countLabel: C.designCount(list.length),
      hasItems: !demo && list.length > 0,
      noItems: !demo && list.length === 0,
      clear: () => change({
        filters: [],
        cat: 'all',
        sort: 'featured',
        min: 0,
        max: priceMax,
        stock: false,
        occasion: 'all'
      }),
      items: list.map(p => {
        const fav = S.isFav(p.id, ['orchid']);
        return {
          ...S.productLink(p.id),
          images: [vfProductImage(p, L)],
          name: p[L][0],
          sub: p[L][1],
          badge: p[L][2],
          price: VF_MONEY(p.price, fa),
          fav,
          toggleFav: S.toggleFav(p.id, ['orchid'])
        };
      })
    };
  }
}
