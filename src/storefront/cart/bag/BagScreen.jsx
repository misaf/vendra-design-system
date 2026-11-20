'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../session/page-context';
import {useBag} from './useBag.js';
import {View} from './BagView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontBag(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useBag(props)}} />;
}
