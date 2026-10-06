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
    const id = vfPageRoute(this.props).post || 'morning-at-the-studio',
      post = VF_POSTS.find(p => p.id === id),
      missing = id !== 'morning-at-the-studio' && !post,
      loading = vfPageRoute(this.props).demo === 'loading';
    if (post) {
      C.title = post[L][0];
      C.lede = post[L][1];
      C.meta = post[L].slice(2).join(' · ');
    }
    return {
      migration: C.migration,
      missing,
      loading,
      hasPost: !missing && !loading,
      ...S,
      t: {
        ...S.t,
        ...C
      },
      hasBlocks: !!post?.body,
      hasClassic: !post?.body,
      blocks: (post?.body?.[L] || []).map(([type, value, caption]) => ({
        paragraph: type === 'p',
        heading: type === 'h',
        quote: type === 'quote',
        image: type === 'img',
        tips: type === 'tips',
        value,
        caption,
        src: type === 'img' ? (window.VF_ASSET_BASE || '../../') + (typeof value === 'string' ? value : value.src) : undefined
      })),
      storyProducts: (post?.products || []).map(id => {
        const p = vfProduct(id);
        return {
          ...S.productLink(id),
          name: p.id,
          price: S.m(p.price),
          images: [vfProductImage(p, L)]
        };
      }),
      shareWa: 'https://wa.me/?text=' + encodeURIComponent(location.href),
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
      related: VF_POSTS.filter(p => p.id !== id).slice(0, 3).map(p => {
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
