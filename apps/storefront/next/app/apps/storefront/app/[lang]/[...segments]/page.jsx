import {storefrontPage} from '@storefront/next/app/route-page.jsx';
import NotFoundScreen from '@storefront/features/notfound/NotFoundScreen.jsx';
import {VF_STORE} from '@storefront/shared/domain/store-config.js';

export function generateStaticParams({params}) {
  return params.lang === VF_STORE.languages[0]
    ? [{segments: ['_fallback']}, {segments: ['notfound']}]
    : [{segments: ['notfound']}];
}

export default storefrontPage(
  ({segments}) => segments.map(encodeURIComponent).join('/'),
  NotFoundScreen,
  {
    fallback: true
  }
);
