'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../shell/ui/storefront-page.js';
import {useHome} from './useHome.js';
import {View} from './HomeView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false, frame: 'soft'};

export default function StorefrontHome(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useHome(props)}} />;
}
