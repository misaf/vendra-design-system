import {storefrontPage} from '../../../../../route-page.jsx';
import View from '../../../../../../../pages/weddings/Page.jsx';
import {vfFeatures} from '../../../../../../../shared/domain/store-config.js';
import NotFound from '../../../../../../../pages/notfound/Page.jsx';

export default storefrontPage('weddings', vfFeatures().weddings ? View : NotFound);
