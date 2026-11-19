// App Router route files import their own views. Legacy preview query URLs and the
// static host's tracking fallback can load another view inside the same React tree.
import React from 'react';

const modules = {
  account: () => import('../features/account/AccountScreen.jsx'),
  bag: () => import('../features/cart/BagScreen.jsx'),
  checkout: () => import('../features/checkout/CheckoutScreen.jsx'),
  contact: () => import('../features/contact/ContactScreen.jsx'),
  error: () => import('../features/error/ErrorScreen.jsx'),
  faq: () => import('../features/faq/FaqScreen.jsx'),
  home: () => import('../features/home/HomeScreen.jsx'),
  journal: () => import('../features/journal/JournalScreen.jsx'),
  notfound: () => import('../features/notfound/NotFoundScreen.jsx'),
  policy: () => import('../features/policy/PolicyScreen.jsx'),
  post: () => import('../features/post/PostScreen.jsx'),
  presentation: () => import('../features/counter/PresentationScreen.jsx'),
  product: () => import('../features/product/ProductScreen.jsx'),
  saved: () => import('../features/saved/SavedScreen.jsx'),
  search: () => import('../features/search/SearchScreen.jsx'),
  shop: () => import('../features/catalog/ShopScreen.jsx'),
  signin: () => import('../features/signin/SignInScreen.jsx'),
  track: () => import('../features/tracking/TrackScreen.jsx'),
  weddings: () => import('../features/weddings/WeddingsScreen.jsx')
};

export function lazyPage(name, preview = false) {
  return React.lazy(async () => {
    const {default: Page, defaults} = await modules[name]();
    return {
      default: preview ? props => React.createElement(Page, {...defaults, ...props}) : Page
    };
  });
}
