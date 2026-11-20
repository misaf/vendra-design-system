'use client';

import React from 'react';
import {useStorefrontPageProps, type StorefrontPreviewProps} from '../../session/page-context';
import {useNotFound} from './useNotFound.js';
import {View} from './NotFoundView';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontNotfound(props: StorefrontPreviewProps) {
  const pageProps = useStorefrontPageProps(props);
  return <View v={{...pageProps, ...useNotFound(pageProps)}} />;
}
