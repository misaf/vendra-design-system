import {storefrontPage} from '@storefront/next/app/route-page.jsx';
import PolicyScreen from '@storefront/features/policy/PolicyScreen.jsx';
import {VF_POLICIES} from '@storefront/shared/services/routing.js';

export function generateStaticParams() {
  return VF_POLICIES.map(document => ({document}));
}

export default storefrontPage(
  ({document}) => 'policy/' + encodeURIComponent(document),
  PolicyScreen
);
