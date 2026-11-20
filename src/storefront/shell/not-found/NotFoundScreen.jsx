'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../session/page-context';
import {useNotFound} from './useNotFound.js';
import {View} from './NotFoundView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontNotfound(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useNotFound(props)}} />;
}
