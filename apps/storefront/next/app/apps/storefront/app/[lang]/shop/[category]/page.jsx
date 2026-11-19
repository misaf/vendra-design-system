import {storefrontPage} from '../../../../../../route-page.jsx';
import View from '../../../../../../../../pages/shop/Page.jsx';
import {VF_CATEGORY_SLUGS} from '../../../../../../../../shared/domain/product-categories.js';

export function generateStaticParams() {
  return VF_CATEGORY_SLUGS.map(category => ({category}));
}

export default storefrontPage(({category}) => 'shop/' + encodeURIComponent(category), View);
