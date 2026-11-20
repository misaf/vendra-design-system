'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../../../shared/ui/storefront-page.js';
import {useFaq} from './useFaq.js';
import {View} from './FaqView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontFaq(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useFaq(props)}} />;
}
