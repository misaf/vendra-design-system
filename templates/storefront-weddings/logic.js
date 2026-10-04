// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    sent: false,
    name: '',
    phone: '',
    e1: false,
    e2: false,
    wDate: ''
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'weddings');
    const s = this.state;
    const C = vfCopy(S);
    return {
      ...S,
      t: {
        ...S.t,
        ...C,
        editMessage: C.labels.returnToForm
      },
      wDate: s.wDate,
      setWDate: v => this.setState({
        wDate: v
      }),
      today: (() => {
        const d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      })(),
      services: C.sv.map(x => ({
        icon: x[0],
        title: x[1],
        body: x[2],
        price: x[3]
      })),
      sent: s.sent,
      notSent: !s.sent,
      editMessage: () => {
        this.setState({
          sent: false
        });
        S.focus('vf-wname');
      },
      name: s.name,
      setName: e => this.setState({
        name: e.target.value,
        e1: false
      }),
      nameErr: s.e1 ? C.nameErr : undefined,
      phone: s.phone,
      setPhone: e => this.setState({
        phone: e.target.value,
        e2: false
      }),
      phoneErr: s.e2 ? C.phoneErr : undefined,
      types: C.types,
      budgets: C.budgets,
      send: () => {
        const e1 = !s.name.trim(),
          e2 = !/^09\d{9}$/.test(vfPhone(s.phone));
        if (e1 || e2) {
          this.setState({
            e1,
            e2
          });
          setTimeout(() => {
            const el = document.getElementById(e1 ? 'vf-wname' : 'vf-wphone');
            el && el.focus();
          }, 0);
          return;
        }
        this.setState({
          sent: true
        });
        S.focus('vf-weddings-success');
      }
    };
  }
}
