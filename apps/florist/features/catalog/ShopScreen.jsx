'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../shared/ui/storefront-page.js';
import {useShop} from './useShop.js';
import {View} from './ShopView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false, frame: 'soft'};

export default function StorefrontShop(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useShop(props)}} />;
}
