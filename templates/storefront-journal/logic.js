// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    cat: 'all'
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'journal');
    const fa = S.fa;
    const L = S.lang;
    const s = this.state;
    const C = vfCopy(S);
    const list = VF_POSTS.filter(p => s.cat === 'all' || p.cat === s.cat).map(p => {
      const c = VF_JCATS.find(x => x[0] === p.cat);
      return {
        title: p[L][0],
        excerpt: p[L][1],
        meta: (fa ? c[2] : c[1]) + ' · ' + p[L][3] + ' · ' + p[L][2]
      };
    });
    return {
      ...S,
      leadLayout: S.mob ? 'stack' : 'wide',
      t: {
        ...S.t,
        ...C
      },
      cats: VF_JCATS.map(c => ({
        label: fa ? c[2] : c[1],
        on: s.cat === c[0],
        pick: () => this.setState({
          cat: c[0]
        })
      })),
      hasLead: list.length > 0,
      lead: list[0] || {},
      rest: list.slice(1)
    };
  }
}
