'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../session/page-context';
import {useTrack} from './useTrack.js';
import {View} from './TrackView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false, status: 'onTheWay'};

export default function StorefrontTrack(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useTrack(props)}} />;
}
