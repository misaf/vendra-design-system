// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  renderVals() {
    const S = vfShell.call(this, this.props, 'notfound');
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
        price: S.m(p.price)
      }))
    };
  }
}
