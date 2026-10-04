// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    sent: false,
    msg: '',
    err: false
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'contact');
    const s = this.state;
    const C = vfCopy(S);
    return {
      ...S,
      t: {
        ...S.t,
        ...C,
        instagram: C.labels.instagram,
        editMessage: C.labels.returnToForm
      },
      rows: ['map-pin', 'clock', 'phone', 'message-circle', 'instagram'].map((icon, i) => ({
        icon,
        label: C.rowLabels[i],
        value: i === 0 ? S.t.address : i === 1 ? S.t.hours : '\u2068' + [S.phoneLabel, S.phoneLabel, S.instagram.label][i - 2] + '\u2069'
      })),
      topics: C.topics,
      sent: s.sent,
      notSent: !s.sent,
      editMessage: () => {
        this.setState({
          sent: false
        });
        S.focus('vf-cmsg');
      },
      msg: s.msg,
      setMsg: e => this.setState({
        msg: e.target.value,
        err: false
      }),
      msgErr: s.err ? C.msgErr : undefined,
      send: () => {
        if (!s.msg.trim()) {
          this.setState({
            err: true
          });
          setTimeout(() => {
            const el = document.getElementById('vf-cmsg');
            el && el.focus();
          }, 0);
          return;
        }
        this.setState({
          sent: true
        });
        S.focus('vf-contact-success');
      }
    };
  }
}
