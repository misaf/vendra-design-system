'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../shell/ui/storefront-page.js';
import {useSearch} from './useSearch.js';
import {View} from './SearchView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontSearch(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useSearch(props)}} />;
}
