import {storefrontPage} from '../../../../../route-page.jsx';
import View from '../../../../../../../pages/notfound/Page.jsx';
import {VF_STORE} from '../../../../../../../shared/domain/store-config.js';

export function generateStaticParams({params}) {
  return params.lang === VF_STORE.languages[0]
    ? [{segments: ['_fallback']}, {segments: ['notfound']}]
    : [{segments: ['notfound']}];
}

export default storefrontPage(({segments}) => segments.map(encodeURIComponent).join('/'), View, {
  fallback: true
});
