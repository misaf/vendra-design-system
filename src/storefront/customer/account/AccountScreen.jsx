'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../shell/ui/storefront-page.js';
import {useAccount} from './useAccount.js';
import {View} from './AccountView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false, tab: 'orders'};

export default function StorefrontAccount(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useAccount(props)}} />;
}
