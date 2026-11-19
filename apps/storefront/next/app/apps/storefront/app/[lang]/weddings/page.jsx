import {storefrontPage} from '@storefront/next/app/route-page.jsx';
import WeddingsScreen from '@storefront/features/weddings/WeddingsScreen.jsx';
import {vfFeatures} from '@storefront/shared/domain/store-config.js';
import NotFound from '@storefront/features/notfound/NotFoundScreen.jsx';

export default storefrontPage('weddings', vfFeatures().weddings ? WeddingsScreen : NotFound);
