import {storefrontPage} from '@storefront/next/app/route-page.jsx';
import ShopScreen from '@storefront/features/shop/ShopScreen.jsx';
import {VF_CATEGORY_SLUGS} from '@storefront/shared/domain/product-categories.js';

export function generateStaticParams() {
  return VF_CATEGORY_SLUGS.map(category => ({category}));
}

export default storefrontPage(({category}) => 'shop/' + encodeURIComponent(category), ShopScreen);
