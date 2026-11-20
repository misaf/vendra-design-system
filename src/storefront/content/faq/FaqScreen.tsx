'use client';

import React from 'react';
import {useStorefrontPageProps, type StorefrontPreviewProps} from '../../session/page-context';
import {useFaq} from './useFaq.js';
import {View} from './FaqView';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontFaq(props: StorefrontPreviewProps) {
  const pageProps = useStorefrontPageProps(props);
  return <View v={{...pageProps, ...useFaq(pageProps)}} />;
}
