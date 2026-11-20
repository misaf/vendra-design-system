import {storefrontPage} from '@storefront/server/route-page';
import ProductScreen from './ProductScreen.jsx';
import {VF_PRODUCTS} from '@storefront/src/storefront/catalog/catalog.js';

export function generateStaticParams() {
  return VF_PRODUCTS.map(({id}) => ({code: id}));
}

export default storefrontPage(
  ({code}: {code: string}) => 'product/' + encodeURIComponent(code),
  ProductScreen
);
