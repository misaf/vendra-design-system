'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../shared/ui/storefront-page.js';
import {usePresentation} from './usePresentation.js';
import {View} from './PresentationView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontPresentation(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...usePresentation(props)}} />;
}
