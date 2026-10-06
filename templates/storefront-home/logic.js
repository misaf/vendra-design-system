// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  renderVals() {
    const fa = this.props.lang === 'fa';
    const L = fa ? 'fa' : 'en';
    const S = vfShell.call(this, this.props, 'home');
    const C = vfCopy(S);
    return {
      ...S,
      frame: this.props.frame ?? 'soft',
      t: {
        ...S.t,
        ...C
      },
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
        price: VF_MONEY(p.price, fa)
      }))
    };
  }
}
