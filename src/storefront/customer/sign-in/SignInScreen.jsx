'use client';

import React from 'react';
import {useStorefrontPageProps} from '../../session/page-context';
import {useSignIn} from './useSignIn.js';
import {View} from './SignInView.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false};

export default function StorefrontSignin(props) {
  props = useStorefrontPageProps(props);
  return <View v={{...props, ...useSignIn(props)}} />;
}
