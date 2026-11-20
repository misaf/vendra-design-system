import {storefrontPage} from '@storefront/src/app/_server/route-page';
import JournalScreen from '../../../../storefront/content/journal/JournalScreen.jsx';
import {vfFeatures} from '@storefront/src/storefront/store/store-config.js';
import NotFound from '../../../../storefront/shell/not-found/NotFoundScreen.jsx';

export default storefrontPage('journal', vfFeatures().journal ? JournalScreen : NotFound);
