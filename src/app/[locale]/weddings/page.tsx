import {storefrontPage} from '@storefront/src/app/_server/route-page';
import WeddingsScreen from '../../../storefront/content/weddings/WeddingsScreen.jsx';
import {vfFeatures} from '@storefront/src/storefront/store/store-config.js';
import NotFound from '../../../storefront/shell/not-found/NotFoundScreen.jsx';

export default storefrontPage('weddings', vfFeatures().weddings ? WeddingsScreen : NotFound);
