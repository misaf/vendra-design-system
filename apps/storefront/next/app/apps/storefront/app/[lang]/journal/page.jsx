import {storefrontPage} from '@storefront/next/app/route-page.jsx';
import JournalScreen from '@storefront/features/journal/JournalScreen.jsx';
import {vfFeatures} from '@storefront/shared/domain/store-config.js';
import NotFound from '@storefront/features/notfound/NotFoundScreen.jsx';

export default storefrontPage('journal', vfFeatures().journal ? JournalScreen : NotFound);
