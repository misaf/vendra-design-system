import {storefrontPage} from '@storefront/src/app/_server/route-page';
import ShopScreen from '../../../../../storefront/catalog/shop/ShopScreen.jsx';
import {VF_CATEGORY_SLUGS} from '@storefront/src/storefront/catalog/product-categories.js';

export function generateStaticParams() {
  return VF_CATEGORY_SLUGS.map(category => ({category}));
}

export default storefrontPage(
  ({category}: {category: string}) => 'shop/' + encodeURIComponent(category),
  ShopScreen
);
