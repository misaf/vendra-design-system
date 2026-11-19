import {storefrontPage} from '../../../../../route-page.jsx';
import View from '../../../../../../../pages/journal/Page.jsx';
import {vfFeatures} from '../../../../../../../shared/domain/store-config.js';
import NotFound from '../../../../../../../pages/notfound/Page.jsx';

export default storefrontPage('journal', vfFeatures().journal ? View : NotFound);
