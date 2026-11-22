'use client';

import React from 'react';
import {demoProductCodes, readDemoProduct} from '../../demo/catalog.mjs';
import ProductScreen from '../../storefront/catalog/product/ProductScreen.jsx';
import {vfPageRoute} from '../../storefront/shell/routing.js';

export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function DemoProductPreview(props) {
  const code = vfPageRoute(props).id;
  const locale = props.lang === 'fa' ? 'fa' : 'en';
  const fixture = readDemoProduct(code, locale) ?? readDemoProduct(demoProductCodes()[0], locale);
  return <ProductScreen {...props} {...fixture} />;
}
