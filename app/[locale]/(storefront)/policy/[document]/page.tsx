import {storefrontPage} from '@storefront/server/route-page';
import PolicyScreen from '../PolicyScreen.jsx';
import {VF_POLICIES} from '@storefront/shared/services/routing.js';

export function generateStaticParams() {
  return VF_POLICIES.map(document => ({document}));
}

export default storefrontPage(
  ({document}: {document: string}) => 'policy/' + encodeURIComponent(document),
  PolicyScreen
);
