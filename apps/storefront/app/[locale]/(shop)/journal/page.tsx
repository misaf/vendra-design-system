import {storefrontPage} from '@storefront/server/route-page';
import JournalScreen from '@storefront/features/journal/JournalScreen.jsx';
import {vfFeatures} from '@storefront/shared/domain/store-config.js';
import NotFound from '@storefront/features/notfound/NotFoundScreen.jsx';

export default storefrontPage('journal', vfFeatures().journal ? JournalScreen : NotFound);
