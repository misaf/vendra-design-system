import {storefrontPage} from '@storefront/server/route-page';
import JournalScreen from './JournalScreen.jsx';
import {vfFeatures} from '@storefront/domain/store-config.js';
import NotFound from '../../../_not-found/NotFoundScreen.jsx';

export default storefrontPage('journal', vfFeatures().journal ? JournalScreen : NotFound);
