import {storefrontPage} from '@storefront/server/route-page';
import NotFoundScreen from '@storefront/features/notfound/NotFoundScreen.jsx';
import {VF_STORE} from '@storefront/shared/domain/store-config.js';

export function generateStaticParams({params}: {params: {locale: string}}) {
  return params.locale === VF_STORE.languages[0]
    ? [{segments: ['_fallback']}, {segments: ['notfound']}]
    : [{segments: ['notfound']}];
}

export default storefrontPage(
  ({segments}: {segments: string[]}) => segments.map(encodeURIComponent).join('/'),
  NotFoundScreen,
  {
    fallback: true
  }
);
