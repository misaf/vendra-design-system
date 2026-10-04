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
      chips: route.filters || []
    };
    const change = patch => {
      const next = {
        ...route,
        view: 'shop',
        lang: L,
        cat: s.cat,
        sort: s.sort,
        filters: s.chips,
        ...patch
      };
      if (this.props.go) this.props.go(next);else location.href = S.href.shop.split('?')[0] + vfRouteParams(next);
    };
    const inCat = p => s.cat === 'all' || p.cat === s.cat;
    let list = VF_PRODUCTS.filter(inCat).filter(p => s.chips.every(id => VF_CHIPS.find(c => c[0] === id)[1](p)));
    if (s.sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (s.sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    return {
      ...S,
      frame: this.props.frame ?? 'soft',
      t: {
        ...S.t,
        ...C
      },
      categories: VF_CATS.map(id => {
        const on = s.cat === id;
        return {
          label: VF_CATEGORY_COPY[L][id],
          count: n(VF_PRODUCTS.filter(p => id === 'all' || p.cat === id).length),
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
      hasItems: list.length > 0,
      noItems: list.length === 0,
      clear: () => change({
        filters: [],
        cat: 'all',
        sort: 'featured'
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
