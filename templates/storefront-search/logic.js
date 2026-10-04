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
    const res = q ? VF_PRODUCTS.filter(p => (p.en.join(' ') + ' ' + p.fa.join(' ')).toLowerCase().includes(q)) : [];
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
        name: p[L][0],
        sub: p[L][1],
        price: S.m(p.price)
      }))
    };
  }
}
