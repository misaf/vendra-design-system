import React from 'react';
import {Input} from '../Input/Input.jsx';
import {commerce} from '../utils/commerce.js';

// A phone number field: the phone keypad on touch screens, autofill, and digits kept left to right
// inside Persian text. It shows what the customer types; `onValueChange` also gets the number in
// Latin digits without spaces or dashes, and whether it is an Iranian mobile number.
export function PhoneInput({autoComplete = 'tel', onChange, onValueChange, ...rest}) {
  const change = event => {
    onChange && onChange(event);
    if (onValueChange) {
      const number = commerce.phone(event.target.value);
      onValueChange(number, commerce.isMobile(number));
    }
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
