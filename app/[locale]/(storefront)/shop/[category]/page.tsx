import {storefrontPage} from '@storefront/server/route-page';
import ShopScreen from '../ShopScreen.jsx';
import {VF_CATEGORY_SLUGS} from '@storefront/domain/product-categories.js';

export function generateStaticParams() {
  return VF_CATEGORY_SLUGS.map(category => ({category}));
}

export default storefrontPage(
  ({category}: {category: string}) => 'shop/' + encodeURIComponent(category),
  ShopScreen
);
