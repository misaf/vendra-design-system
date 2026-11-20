'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../../../shared/ui/storefront-page.js';
import {useWeddings} from './useWeddings.js';
import {View} from './WeddingsView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontWeddings(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useWeddings(props)}} />;
}
