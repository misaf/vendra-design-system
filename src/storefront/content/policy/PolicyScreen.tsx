'use client';

import React from 'react';
import {useStorefrontPageProps, type StorefrontPreviewProps} from '../../session/page-context';
import {usePolicy} from './usePolicy.js';
import {View} from './PolicyView';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false, doc: 'shipping'};

export default function StorefrontPolicy(props: StorefrontPreviewProps & {doc?: string}) {
  const pageProps = useStorefrontPageProps(props);
  return <View v={{...pageProps, ...usePolicy(pageProps)}} />;
}
