// App Router route files import their own views. Legacy preview query URLs and the
// static host's tracking fallback can load another view inside the same React tree.
import React from 'react';

const modules = {
  account: () => import('../../storefront/customer/account/AccountScreen.jsx'),
  bag: () => import('../../storefront/cart/bag/BagScreen.jsx'),
  checkout: () => import('../../storefront/checkout/order-checkout/CheckoutScreen.jsx'),
  contact: () => import('../../storefront/content/contact/ContactScreen.jsx'),
  error: () => import('../../storefront/shell/error/ErrorScreen.jsx'),
  faq: () => import('../../storefront/content/faq/FaqScreen.jsx'),
  home: () => import('../../storefront/catalog/home/HomeScreen.jsx'),
  journal: () => import('../../storefront/content/journal/JournalScreen.jsx'),
  notfound: () => import('../../storefront/shell/not-found/NotFoundScreen.jsx'),
  policy: () => import('../../storefront/content/policy/PolicyScreen.jsx'),
  post: () => import('../../storefront/content/journal/post/PostScreen.jsx'),
  presentation: () => import('../../storefront/presentation/PresentationScreen.jsx'),
  product: () => import('../../storefront/catalog/product/ProductScreen.jsx'),
  saved: () => import('../../storefront/customer/saved/SavedScreen.jsx'),
  search: () => import('../../storefront/catalog/search/SearchScreen.jsx'),
  shop: () => import('../../storefront/catalog/shop/ShopScreen.jsx'),
  signin: () => import('../../storefront/customer/sign-in/SignInScreen.jsx'),
  track: () => import('../../storefront/orders/tracking/TrackScreen.jsx'),
  weddings: () => import('../../storefront/content/weddings/WeddingsScreen.jsx')
};

export function lazyPage(name: string, preview = false) {
  return React.lazy(async () => {
    if (!Object.hasOwn(modules, name)) throw new Error('Unknown storefront preview: ' + name);
    const {default: Page, defaults} = await modules[name as keyof typeof modules]();
    return {
      default: preview ? props => React.createElement(Page, {...defaults, ...props}) : Page
    };
  });
}
