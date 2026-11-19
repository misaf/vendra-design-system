// App Router route files import their own views. Legacy preview query URLs and the
// static host's tracking fallback can load another view inside the same React tree.
import React from 'react';

const modules = {
  account: () => import('../pages/account/Page.jsx'),
  bag: () => import('../pages/bag/Page.jsx'),
  checkout: () => import('../pages/checkout/Page.jsx'),
  contact: () => import('../pages/contact/Page.jsx'),
  error: () => import('../pages/error/Page.jsx'),
  faq: () => import('../pages/faq/Page.jsx'),
  home: () => import('../pages/home/Page.jsx'),
  journal: () => import('../pages/journal/Page.jsx'),
  notfound: () => import('../pages/notfound/Page.jsx'),
  policy: () => import('../pages/policy/Page.jsx'),
  post: () => import('../pages/post/Page.jsx'),
  presentation: () => import('../pages/presentation/Page.jsx'),
  product: () => import('../pages/product/Page.jsx'),
  saved: () => import('../pages/saved/Page.jsx'),
  search: () => import('../pages/search/Page.jsx'),
  shop: () => import('../pages/shop/Page.jsx'),
  signin: () => import('../pages/signin/Page.jsx'),
  track: () => import('../pages/track/Page.jsx'),
  weddings: () => import('../pages/weddings/Page.jsx')
};

export function lazyPage(name, preview = false) {
  return React.lazy(async () => {
    const {default: Page, defaults} = await modules[name]();
    return {
      default: preview ? props => React.createElement(Page, {...defaults, ...props}) : Page
    };
  });
}
