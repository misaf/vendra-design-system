import React from 'react';
import {usePage} from './logic.js';
import {View} from './View.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false, step: 'pay'};

export default function StorefrontCheckout(props) {
  return <View v={{...props, ...usePage(props)}} />;
}
