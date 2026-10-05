// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  renderVals() {
    const fa = this.props.lang === 'fa';
    const L = fa ? 'fa' : 'en';
    const S = vfShell.call(this, this.props, 'home');
    const C = vfCopy(S);
    const cats = ['bouquets', 'boxes', 'orchids', 'bridal'];
    return {
      ...S,
      frame: this.props.frame ?? 'soft',
      t: {
        ...S.t,
        ...C
      },
      categories: cats.map(id => {
        const count = VF_PRODUCTS.filter(p => p.cat === id).length;
        return {
          ...S.shopLink(id),
          label: VF_CATEGORY_COPY[L][id],
          count: C.designCount(count)
        };
      }),
      products: VF_PRODUCTS.filter(p => p.inStock !== false).map(p => ({
        fav: S.isFav(p.id, []),
        toggleFav: S.toggleFav(p.id, []),
        ...S.productLink(p.id),
        images: [vfProductImage(p, L)],
        name: p[L][0],
        sub: p[L][1],
        badge: p[L][2],
        price: VF_MONEY(p.price, fa)
      }))
    };
  }
}
