import {storefrontPage} from '../../../../../../route-page.jsx';
import View from '../../../../../../../../pages/product/Page.jsx';
import {VF_PRODUCTS} from '../../../../../../../../shared/domain/catalog.js';

export function generateStaticParams() {
  return VF_PRODUCTS.map(({id}) => ({code: id}));
}

export default storefrontPage(({code}) => 'product/' + encodeURIComponent(code), View);
