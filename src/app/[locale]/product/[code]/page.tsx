import {storefrontPage} from '@storefront/src/app/_routing/route-page';
import ProductScreen from '../../../../storefront/catalog/product/ProductScreen.jsx';
import {VF_PRODUCTS} from '@storefront/src/storefront/catalog/catalog.js';

export function generateStaticParams() {
  return VF_PRODUCTS.map(({id}) => ({code: id}));
}

export default storefrontPage(
  ({code}: {code: string}) => 'product/' + encodeURIComponent(code),
  ProductScreen
);
