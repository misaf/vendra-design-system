'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../../../shared/ui/storefront-page.js';
import {usePolicy} from './usePolicy.js';
import {View} from './PolicyView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false, doc: 'shipping'};

export default function StorefrontPolicy(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...usePolicy(props)}} />;
}
