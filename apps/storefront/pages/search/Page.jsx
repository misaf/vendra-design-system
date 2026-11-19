'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../shared/ui/storefront-page.js';
import {usePage} from './logic.js';
import {View} from './View.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontSearch(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...usePage(props)}} />;
}
