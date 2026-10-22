import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontSigninCodeControls({problems, code, verify}) {
  return (
    <>
      <DS.ErrorSummary id="vf-code-errors" errors={problems} />
      <DS.CodeInput
        id="vf-code"
        label={code.label}
        value={code.value}
        length={5}
        onChange={code.onChange}
        onComplete={code.onComplete}
        error={code.error}
        hint={code.hint}
      />
      <DS.Button variant="primary" size="lg" block={true} onClick={verify.onClick}>
        <>{verify.label}</>
      </DS.Button>
    </>
  );
}
