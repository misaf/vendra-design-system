import {storefrontPage} from '@storefront/src/app/_routing/route-page';
import PolicyScreen from '../../../../storefront/content/policy/PolicyScreen';
import {VF_POLICIES} from '@storefront/src/storefront/content/policy-documents.js';

export function generateStaticParams() {
  return VF_POLICIES.map(document => ({document}));
}

export default storefrontPage(
  ({document}: {document: string}) => 'policy/' + encodeURIComponent(document),
  PolicyScreen
);
