import React from 'react';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {ErrorSummary} from '../../../../../../components/ui/patterns/molecules/ErrorSummary/ErrorSummary.jsx';
import {PhoneInput} from '../../../../../../components/ui/patterns/atoms/PhoneInput/PhoneInput.jsx';

export function StorefrontSigninPhoneControls({problems, phone, send}) {
  return (
    <>
      <ErrorSummary id="vf-signin-errors" errors={problems} />
      <PhoneInput
        id="vf-phone"
        label={phone.label}
        placeholder="0912 000 0000"
        value={phone.value}
        onChange={phone.onChange}
        error={phone.error}
      />
      <Button variant="primary" size="lg" block={true} onClick={send.onClick}>
        <>{send.label}</>
      </Button>
    </>
  );
}
