'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../../shell/ui/storefront-page.js';
import {usePost} from './usePost.js';
import {View} from './PostView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontPost(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...usePost(props)}} />;
}
