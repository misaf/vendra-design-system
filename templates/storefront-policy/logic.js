// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  renderVals() {
    const S = vfShell.call(this, this.props, 'policy');
    const L = S.lang;
    const id = this.props.doc ?? 'shipping';
    const C = vfCopy(S);
    const d = C.docs[id] || C.docs.shipping;
    return {
      ...S,
      t: {
        ...S.t,
        ...C
      },
      doc: {
        title: d[0],
        sections: d[1].map((x, i) => ({
          id: 's' + (i + 1),
          href: '#s' + (i + 1),
          title: (L === 'fa' ? VF_FA_DIGITS(i + 1) : i + 1) + '. ' + x[0],
          body: x[1]
        }))
      }
    };
  }
}
