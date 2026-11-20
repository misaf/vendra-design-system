'use client';

import React from 'react';
import {useStorefrontPageProps, type StorefrontPreviewProps} from '../../session/page-context';
import {useError} from './useError.js';
import {View} from './ErrorView';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontError(props: StorefrontPreviewProps) {
  const pageProps = useStorefrontPageProps(props);
  return <View v={{...pageProps, ...useError(pageProps)}} />;
}
