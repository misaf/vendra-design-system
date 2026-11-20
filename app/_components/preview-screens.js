// App Router route files import their own views. Legacy preview query URLs and the
// static host's tracking fallback can load another view inside the same React tree.
import React from 'react';

const modules = {
  account: () => import('../[locale]/(storefront)/account/AccountScreen.jsx'),
  bag: () => import('../[locale]/(checkout)/bag/BagScreen.jsx'),
  checkout: () => import('../[locale]/(checkout)/checkout/CheckoutScreen.jsx'),
  contact: () => import('../[locale]/(storefront)/contact/ContactScreen.jsx'),
  error: () => import('../[locale]/(storefront)/error/ErrorScreen.jsx'),
  faq: () => import('../[locale]/(storefront)/faq/FaqScreen.jsx'),
  home: () => import('../[locale]/(storefront)/HomeScreen.jsx'),
  journal: () => import('../[locale]/(storefront)/journal/JournalScreen.jsx'),
  notfound: () => import('../_not-found/NotFoundScreen.jsx'),
  policy: () => import('../[locale]/(storefront)/policy/PolicyScreen.jsx'),
  post: () => import('../[locale]/(storefront)/journal/[post]/PostScreen.jsx'),
  presentation: () => import('../[locale]/presentation/PresentationScreen.jsx'),
  product: () => import('../[locale]/(storefront)/product/[code]/ProductScreen.jsx'),
  saved: () => import('../[locale]/(storefront)/saved/SavedScreen.jsx'),
  search: () => import('../[locale]/(storefront)/search/SearchScreen.jsx'),
  shop: () => import('../[locale]/(storefront)/shop/ShopScreen.jsx'),
  signin: () => import('../[locale]/(storefront)/signin/SignInScreen.jsx'),
  track: () => import('../[locale]/(storefront)/track/TrackScreen.jsx'),
  weddings: () => import('../[locale]/(storefront)/weddings/WeddingsScreen.jsx')
};

export function lazyPage(name, preview = false) {
  return React.lazy(async () => {
    const {default: Page, defaults} = await modules[name]();
    return {
      default: preview ? props => React.createElement(Page, {...defaults, ...props}) : Page
    };
  });
}
