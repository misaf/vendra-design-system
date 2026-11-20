import {storefrontPage} from '@storefront/server/route-page';
import WeddingsScreen from './WeddingsScreen.jsx';
import {vfFeatures} from '@storefront/src/storefront/store/store-config.js';
import NotFound from '../../../_not-found/NotFoundScreen.jsx';

export default storefrontPage('weddings', vfFeatures().weddings ? WeddingsScreen : NotFound);
