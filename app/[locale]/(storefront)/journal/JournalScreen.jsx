'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../../../shared/ui/storefront-page.js';
import {useJournal} from './useJournal.js';
import {View} from './JournalView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontJournal(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useJournal(props)}} />;
}
