'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../../../../shared/ui/storefront-page.js';
import {useProduct} from './useProduct.js';
import {View} from './ProductView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontProduct(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useProduct(props)}} />;
}
