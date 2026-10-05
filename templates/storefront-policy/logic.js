// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  renderVals() {
    const S = vfShell.call(this, this.props, 'policy');
    const L = S.lang;
    // A standalone page can be given props.doc; the site opens ?view=policy&id=<doc>.
    const id = this.props.doc ?? vfPageRoute(this.props).id ?? VF_POLICIES[0];
    const C = vfCopy(S);
    const d = C.docs[id] || C.docs[VF_POLICIES[0]];
    return {
      ...S,
      t: {
        ...S.t,
        ...C
      },
      doc: {
        title: d.title,
        intro: d.intro,
        sections: d.sections.map((x, i) => ({
          id: 's' + (i + 1),
          href: '#s' + (i + 1),
          title: (L === 'fa' ? VF_FA_DIGITS(i + 1) : i + 1) + '. ' + x.title,
          paras: x.paras.map(text => ({text})),
          hasItems: !!(x.items && x.items.length),
          items: (x.items || []).map(text => ({text}))
        }))
      }
    };
  }
}
