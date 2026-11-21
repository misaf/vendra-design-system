import {vfOnServer, vfStoredValue} from '../../platform/browser/environment.js';
import {VF_NAV} from '../../platform/browser/page-focus.js';
import {vfRuntime} from '../../platform/browser/runtime.js';

// Consent state belongs to the page so storefront routes and standalone previews share the workflow.
export function vfShellConsent(self) {
  const st = self.state;
  // Consent banner: shown until the visitor chooses, and again from "Cookie settings" in the footer.
  // Closing it makes no choice (so nothing is sent) and hides it for this browser session only.
  const dismissed = !!st.vfConsentDismissed || vfStoredValue('vf-consent-dismissed', true) === '1';
  const consentShown =
    (!(st.vfConsent ?? (vfOnServer() ? '' : vfRuntime.track.consent())) && !dismissed) ||
    !!st.vfConsentOpen;
  const hideConsent = patch => {
    const reopened = st.vfConsentOpen;
    self.setState({...patch, vfConsentOpen: false});
    if (reopened) VF_NAV.focusById(self._vfConsentTrigger || 'vf-consent-settings');
  };
  const choose = value => {
    vfRuntime.track.setConsent(value);
    hideConsent({vfConsent: value});
  };
  return {
    shown: consentShown,
    accept: () => choose('all'),
    essential: () => choose('essential'),
    close: () => {
      try {
        sessionStorage.setItem('vf-consent-dismissed', '1');
      } catch {}
      hideConsent({vfConsentDismissed: true});
    },
    open: event => {
      self._vfConsentTrigger = event?.currentTarget?.id || 'vf-consent-settings';
      self.setState({vfConsentOpen: true});
      VF_NAV.focusById('vf-consent');
    }
  };
}
