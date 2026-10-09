// Page behavior. Edit here, then run npm --prefix templates run build.
// Seconds before another code can be requested.
const VF_SIGNIN_RESEND_SECONDS = 60;
class Component extends VFPage {
  state = {
    step: 'phone',
    phone: '',
    code: '',
    pErr: false,
    cErr: false,
    left: 0,
    resent: false
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'account');
    const s = this.state;
    const C = vfCopy(S);
    const focus = id =>
      setTimeout(() => {
        const el = document.getElementById(id);
        el && el.focus();
      }, 0);
    const n = v => (S.fa ? VF_FA_DIGITS(v) : String(v));
    // Signing in from checkout goes back there; the mobile from the last order fills the field.
    const fromCheckout = vfPageRoute(this.props).next === 'delivery';
    const store = this.props.store;
    const last = store && store.lastOrder;
    const phone = s.phone || (s.phoneTouched ? '' : (last && last.delivery.senderPhone) || '');
    return {
      ...S,
      termsLink: S.policyLink('terms'),
      privacyLink: S.policyLink('privacy'),
      t: {
        ...S.t,
        ...C
      },
      isPhone: s.step === 'phone',
      isCode: s.step === 'code',
      isOk: s.step === 'ok',
      // Greets the customer by first name when the account has one.
      okName: s.name ? s.name.trim().split(/\s+/)[0] + '.' : C.okB,
      phone,
      setPhone: e =>
        this.setState({
          phone: e.target.value,
          phoneTouched: true,
          pErr: false
        }),
      phoneErr: s.pErr ? C.phoneErr : undefined,
      codeP: C.codeMessage(phone || '0912 000 0000'),
      // A new code can be sent once the countdown ends.
      waiting: s.left > 0,
      canResend: s.left === 0,
      resendIn: C.resendIn.replace(
        '{time}',
        n(Math.floor(s.left / 60)) + ':' + n(String(s.left % 60).padStart(2, '0'))
      ),
      resentText: s.resent ? C.resent : '',
      resend: () => {
        this.setState({code: '', cErr: false, resent: true});
        this._countdown();
        focus('vf-code');
      },
      fromCheckout,
      notFromCheckout: !fromCheckout,
      backToCheckout: e => {
        if (!this.props.go) return;
        e && e.preventDefault && e.preventDefault();
        this.props.go({view: 'bag', step: 'delivery'});
      },
      checkoutHref:
        (this.props.go ? '' : '../storefront-site/StorefrontSite.dc.html') +
        vfRouteParams({lang: S.lang, view: 'bag', step: 'delivery'}),
      code: s.code,
      // CodeInput hands over the cleaned code: Latin digits, at most five.
      setCode: code =>
        this.setState({
          code,
          cErr: false
        }),
      codeErr: s.cErr ? C.codeErr : undefined,
      send: () => {
        if (!vfMobile(phone)) {
          this.setState({
            pErr: true
          });
          focus('vf-phone');
          return;
        }
        this.setState({
          step: 'code',
          phone,
          resent: false
        });
        this._countdown();
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
        const account = vfAccountLogin(s.phone, S.lang);
        // The name given at checkout becomes the profile name when the account has none.
        if (
          last &&
          last.delivery.sender &&
          !account.profile.name &&
          vfMobile(last.delivery.senderPhone) === vfMobile(s.phone)
        ) {
          account.profile.name = last.delivery.sender;
          vfAccountSave(s.phone, account);
        }
        this._stopCountdown();
        window.VF_TRACK.event('login');
        if (this.props.setLang) this.props.setLang(account.profile.locale);
        this.setState({
          step: 'ok',
          name: account.profile.name
        });
      },
      back: () => {
        this._stopCountdown();
        this.setState({
          step: 'phone',
          code: '',
          left: 0,
          resent: false
        });
      }
    };
  }
  _countdown() {
    this._stopCountdown();
    this.setState({left: VF_SIGNIN_RESEND_SECONDS});
    this._tick = setInterval(() => {
      const left = Math.max(0, this.state.left - 1);
      this.setState({left});
      if (!left) this._stopCountdown();
    }, 1000);
  }
  _stopCountdown() {
    clearInterval(this._tick);
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this._stopCountdown();
  }
}
