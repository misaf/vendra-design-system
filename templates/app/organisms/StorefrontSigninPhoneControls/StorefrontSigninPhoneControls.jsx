import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontSigninPhoneControls({problems, phone, send}) {
  return (
    <>
      <DS.ErrorSummary id="vf-signin-errors" errors={problems} />
      <DS.PhoneInput
        id="vf-phone"
        label={phone.label}
        placeholder="0912 000 0000"
        value={phone.value}
        onChange={phone.onChange}
        error={phone.error}
      />
      <DS.Button variant="primary" size="lg" block={true} onClick={send.onClick}>
        <>{send.label}</>
      </DS.Button>
    </>
  );
}
