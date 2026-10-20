import React from 'react';
import {Input} from '../Input/Input.jsx';
import {commerce} from '../../utils/commerce.js';
import {cx} from '../../utils/cx.js';

// A one-time code field, such as the sign-in code sent by SMS: one input (screen readers and SMS
// autofill handle it better than a box per digit), digits only, Persian digits accepted.
// onChange gets the cleaned code; `onComplete` runs once it has `length` digits (the form decides
// whether to submit, so nothing changes on input unless it asks for it). Where the browser has the
// Web OTP API (Chrome on Android), the code fills itself from an SMS whose last line is
// "@<the site's domain> #<code>", while the field is on screen.
export function CodeInput({
  length = 5,
  value,
  onChange,
  onComplete,
  webOtp = true,
  className,
  ...rest
}) {
  const change = typed => {
    const code = commerce.latin(typed).replace(/\D/g, '').slice(0, length);
    onChange && onChange(code);
    if (onComplete && code.length === length && code !== value) onComplete(code);
  };
  // The SMS can arrive after any number of renders; it fills the code with the latest handlers.
  const latestChange = React.useRef(change);
  latestChange.current = change;
  React.useEffect(() => {
    if (!webOtp || !('OTPCredential' in window) || !navigator.credentials) return;
    const abort = new AbortController();
    navigator.credentials
      .get({otp: {transport: ['sms']}, signal: abort.signal})
      .then(otp => otp && otp.code && latestChange.current(otp.code))
      .catch(() => {});
    return () => abort.abort();
  }, [webOtp]);
  return (
    <Input
      className={cx('ag-code-input', className)}
      inputMode="numeric"
      autoComplete="one-time-code"
      dir="ltr"
      maxLength={length}
      value={value}
      onChange={change}
      {...rest}
    />
  );
}
