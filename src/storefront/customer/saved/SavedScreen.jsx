'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../shell/ui/storefront-page.js';
import {useSaved} from './useSaved.js';
import {View} from './SavedView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontSaved(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useSaved(props)}} />;
}
