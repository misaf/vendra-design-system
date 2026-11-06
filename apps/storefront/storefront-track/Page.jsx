import React from 'react';
import {usePage} from './logic.js';
import {View} from './View.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false, status: 'onTheWay'};

export default function StorefrontTrack(props) {
  return <View v={{...props, ...usePage(props)}} />;
}
