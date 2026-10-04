// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    step: 'phone',
    phone: '',
    code: '',
    pErr: false,
    cErr: false
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'account');
    const s = this.state;
    const lat = v => v.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    const C = vfCopy(S);
    const focus = id => setTimeout(() => {
      const el = document.getElementById(id);
      el && el.focus();
    }, 0);
    return {
      ...S,
      t: {
        ...S.t,
        ...C
      },
      isPhone: s.step === 'phone',
      isCode: s.step === 'code',
      isOk: s.step === 'ok',
      phone: s.phone,
      setPhone: e => this.setState({
        phone: e.target.value,
        pErr: false
      }),
      phoneErr: s.pErr ? C.phoneErr : undefined,
      codeP: C.codeMessage(s.phone || '0912 000 0000'),
      code: s.code,
      setCode: e => this.setState({
        code: lat(e.target.value).replace(/\D/g, '').slice(0, 5),
        cErr: false
      }),
      codeErr: s.cErr ? C.codeErr : undefined,
      send: () => {
        if (lat(s.phone).replace(/\D/g, '').length < 10) {
          this.setState({
            pErr: true
          });
          focus('vf-phone');
          return;
        }
        this.setState({
          step: 'code'
        });
        focus('vf-code');
      },
      verify: () => {
        if (s.code.length !== 5) {
          this.setState({
            cErr: true
          });
          focus('vf-code');
          return;
        }
        this.setState({
          step: 'ok'
        });
      },
      back: () => this.setState({
        step: 'phone',
        code: ''
      })
    };
  }
}
