// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    cat: 'all',
    q: ''
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'journal');
    const fa = S.fa;
    const L = S.lang;
    const s = this.state;
    const C = vfCopy(S);
    const list = VF_POSTS.filter(p => (s.cat === 'all' || p.cat === s.cat) && (!s.q || p[L].join(' ').toLowerCase().includes(s.q.toLowerCase()))).map(p => {
      const c = VF_JCATS.find(x => x[0] === p.cat);
      return {
        href: S.href.post.split('?')[0] + vfRouteParams({
          view: 'post',
          post: p.id,
          lang: L
        }),
        go: this.props.go ? vfLinkHandler(this.props.go) : undefined,
        title: p[L][0],
        excerpt: p[L][1],
        meta: (fa ? c[2] : c[1]) + ' · ' + p[L][3] + ' · ' + p[L][2]
      };
    });
    return {
      ...S,
      migration: C.migration,
      q: s.q,
      setQ: e => this.setState({
        q: e.target.value
      }),
      clear: () => this.setState({
        q: '',
        cat: 'all'
      }),
      loading: vfPageRoute(this.props).demo === 'loading',
      noStories: !list.length,
      leadLayout: S.mob ? 'stack' : 'wide',
      t: {
        ...S.t,
        ...C
      },
      cats: [...VF_JCATS, ['updates', 'Updates', 'خبرها']].map(c => ({
        label: fa ? c[2] : c[1],
        on: s.cat === c[0],
        pick: () => this.setState({
          cat: c[0]
        })
      })),
      hasLead: vfPageRoute(this.props).demo !== 'loading' && list.length > 0,
      lead: list[0] || {},
      rest: vfPageRoute(this.props).demo === 'loading' ? [] : list.slice(1)
    };
  }
}
