// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    copied: false
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'post');
    const fa = S.fa;
    const L = S.lang;
    const C = vfCopy(S);
    return {
      ...S,
      t: {
        ...S.t,
        ...C
      },
      paras1: C.p1,
      paras2: C.p2,
      copyLabel: this.state.copied ? C.copied : C.copy,
      copy: () => {
        try {
          navigator.clipboard.writeText(location.href);
        } catch (e) {}
        this.setState({
          copied: true
        });
        clearTimeout(this._t);
        this._t = setTimeout(() => this.setState({
          copied: false
        }), 1600);
      },
      related: VF_POSTS.slice(1).map(p => {
        const c = VF_JCATS.find(x => x[0] === p.cat);
        return {
          title: p[L][0],
          excerpt: p[L][1],
          meta: (fa ? c[2] : c[1]) + ' · ' + p[L][2]
        };
      })
    };
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    clearTimeout(this._t);
  }
}
