// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {vfAccountLogin, vfAccountSave} from '../_shared/account-data.js';
import {vfMobile} from '../_shared/delivery.js';
import {vfShell} from '../_shared/navigation.js';
import {vfPageRoute, vfRouteParams} from '../_shared/routing.js';
import {usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// Seconds before another code can be requested (ResendCode keeps the time).
const VF_SIGNIN_RESEND_SECONDS = 60;
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      step: 'phone',
      phone: '',
      code: '',
      pErr: false,
      cErr: false,
      resent: false
    };
  });
  useStorefrontPage(page);
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'account');
  const s = page.state;
  const C = vfCopy(S);
  const focus = id =>
    setTimeout(() => {
      const el = document.getElementById(id);
      el && el.focus();
    }, 0);
  // Signing in from checkout goes back there; the mobile from the last order fills the field.
  const fromCheckout = vfPageRoute(page.props).next === 'delivery';
  const store = page.props.store;
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
    setPhone: value =>
      page.setState({
        phone: value,
        phoneTouched: true,
        pErr: false
      }),
    phoneErr: s.pErr ? C.phoneErr : undefined,
    // After a failed step, its problem as a summary linking to the field (the field takes focus).
    phoneProblems: s.pErr ? [{text: C.phoneErr, target: 'vf-phone'}] : [],
    codeP: C.codeMessage(phone || '0912 000 0000'),
    // A new code can be sent once the wait ends.
    resendSeconds: VF_SIGNIN_RESEND_SECONDS,
    resentText: s.resent ? C.resent : '',
    resend: () => {
      page.setState({code: '', cErr: false, resent: true});
      focus('vf-code');
    },
    fromCheckout,
    notFromCheckout: !fromCheckout,
    backToCheckout: e => {
      if (!page.props.go) return;
      e && e.preventDefault && e.preventDefault();
      page.props.go({view: 'bag', step: 'delivery'});
    },
    checkoutHref:
      (page.props.go ? '' : '../app/') +
      vfRouteParams({lang: S.lang, view: 'bag', step: 'delivery'}),
    code: s.code,
    // CodeInput hands over the cleaned code: Latin digits, at most five.
    setCode: code =>
      page.setState({
        code,
        cErr: false
      }),
    codeErr: s.cErr ? C.codeErr : undefined,
    codeProblems: s.cErr ? [{text: C.codeErr, target: 'vf-code'}] : [],
    send: () => {
      if (!vfMobile(phone)) {
        page.setState({
          pErr: true
        });
        focus('vf-phone');
        return;
      }
      page.setState({
        step: 'code',
        phone,
        resent: false
      });
      focus('vf-code');
    },
    verify: () => verifyCode(s.code),
    // The code is checked as soon as all five digits are in (the hint says so), as when the
    // phone fills it from the SMS.
    completeCode: code => verifyCode(code),
    back: () => {
      page.setState({
        step: 'phone',
        code: '',
        resent: false
      });
    }
  };
  function verifyCode(code) {
    if (code.length !== 5) {
      page.setState({
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
    window.VF_TRACK.event('login', {method: 'sms'});
    if (page.props.setLang) page.props.setLang(account.profile.locale);
    page.setState({
      step: 'ok',
      name: account.profile.name
    });
  }
}
