'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../../../shared/ui/storefront-page.js';
import {useError} from './useError.js';
import {View} from './ErrorView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontError(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useError(props)}} />;
}
