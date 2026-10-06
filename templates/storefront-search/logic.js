// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    q: ''
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'search');
    const L = S.lang;
    const q = this.state.q.trim().toLowerCase();
    const C = vfCopy(S);
    // A product code, typed whole or in part (3 or more characters), finds its product; so do its kind and description.
    const code = vfNormalizeToken(q);
    const byCode = p => code.length >= 3 && vfNormalizeToken(p.id).includes(code);
    const words = p => ['en', 'fa'].map(l => vfProductSub(p, l) + ' ' + p[l].sub + ' ' + VF_CATEGORY_COPY[l][p.cat]).join(' ').toLowerCase();
    const res = q ? VF_PRODUCTS.filter(p => byCode(p) || words(p).includes(q)) : [];
    const pop = C.popularTerms;
    return {
      ...S,
      t: {
        ...S.t,
        ...C,
        tryAgain: C.labels.tryAnotherSearch,
        browse: C.labels.browseTheShop
      },
      clearSearch: () => {
        this.setState({
          q: ''
        });
        S.focus('vf-q');
      },
      q: this.state.q,
      setQ: e => this.setState({
        q: e.target.value
      }),
      empty: !q,
      hasResults: res.length > 0,
      noResults: !!q && !res.length,
      countLabel: C.resultCount(res.length),
      popular: pop.map(l => ({
        label: l,
        pick: () => this.setState({
          q: l
        })
      })),
      results: res.map(p => ({
        ...S.productLink(p.id),
        image: vfProductImage(p, L),
        name: p.id,
        sub: vfProductSub(p, L),
        price: S.m(p.price)
      }))
    };
  }
}
