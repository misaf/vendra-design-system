'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../shared/ui/storefront-page.js';
import {useContact} from './useContact.js';
import {View} from './ContactView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontContact(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useContact(props)}} />;
}
