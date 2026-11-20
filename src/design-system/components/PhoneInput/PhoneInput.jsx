'use client';

import React from 'react';
import {Input} from '../Input/Input.jsx';
import {mobile, phone} from '../../utils/input.js';

// A phone number field: the phone keypad on touch screens, autofill, and digits kept left to right
// inside Persian text. onChange(typed, {number, mobile}) gets what the customer types, the number
// (09xxxxxxxxx for an Iranian mobile; otherwise Latin digits without spaces or
// dashes) and whether it is a mobile.
export function PhoneInput({autoComplete = 'tel', onChange, ...rest}) {
  const change = typed => {
    if (!onChange) return;
    const normalized = mobile(typed);
    onChange(typed, {number: normalized || phone(typed), mobile: normalized !== ''});
  };
  return (
    <Input
      type="tel"
      inputMode="tel"
      dir="ltr"
      autoComplete={autoComplete}
      onChange={change}
      {...rest}
    />
  );
}
