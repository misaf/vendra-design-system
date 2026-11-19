import {storefrontPage} from '../../../../../../route-page.jsx';
import View from '../../../../../../../../pages/policy/Page.jsx';
import {VF_POLICIES} from '../../../../../../../../shared/services/routing.js';

export function generateStaticParams() {
  return VF_POLICIES.map(document => ({document}));
}

export default storefrontPage(({document}) => 'policy/' + encodeURIComponent(document), View);
