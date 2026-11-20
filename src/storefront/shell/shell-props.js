import {vfShellNavigation} from './navigation.js';
import {vfShellConsent} from './consent.js';

export function vfShell(page, view) {
  const navigation = vfShellNavigation(page, view);
  return {
    ...navigation,
    consent: {...vfShellConsent(page), policy: navigation.policyLink('privacy')}
  };
}
