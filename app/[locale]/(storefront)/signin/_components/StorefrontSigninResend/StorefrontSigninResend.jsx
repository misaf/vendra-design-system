import React from 'react';
import {ResendCode} from '../../../../../../ui/components/ResendCode/ResendCode.jsx';

export function StorefrontSigninResend({seconds, onResend, resentText}) {
  return (
    <div className="vf-signin-resend tw:flex tw:flex-col tw:gap-2 tw:items-start">
      <ResendCode seconds={seconds} onResend={onResend} />
      <p role="status" className="tw:m-0 tw:text-sm">
        <>{resentText}</>
      </p>
    </div>
  );
}
