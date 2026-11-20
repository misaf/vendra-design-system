import {storefrontPage} from '@storefront/src/app/_server/route-page';
import PolicyScreen from '../../../../../storefront/content/policy/PolicyScreen.jsx';
import {VF_POLICIES} from '@storefront/src/storefront/shell/routing.js';

export function generateStaticParams() {
  return VF_POLICIES.map(document => ({document}));
}

export default storefrontPage(
  ({document}: {document: string}) => 'policy/' + encodeURIComponent(document),
  PolicyScreen
);
