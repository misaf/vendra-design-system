'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../session/page-context';
import {useProduct} from './useProduct.js';
import {View} from './ProductView.jsx';

export default function StorefrontProduct({product, details, ...previewProps}) {
  const pageProps = {...useStorefrontPageProps(previewProps), product, details};
  return <View v={{...pageProps, ...useProduct(pageProps)}} />;
}
