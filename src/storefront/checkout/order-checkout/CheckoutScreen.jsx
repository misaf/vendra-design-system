'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../shell/ui/storefront-page.js';
import {useCheckout} from './useCheckout.js';
import {View} from './CheckoutView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false, step: 'pay'};

export default function StorefrontCheckout(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useCheckout(props)}} />;
}
