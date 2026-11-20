import React from 'react';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';
import {CodeInput} from '../../../../../../ui/components/CodeInput/CodeInput.jsx';
import {ErrorSummary} from '../../../../../../ui/components/ErrorSummary/ErrorSummary.jsx';

export function StorefrontSigninCodeControls({problems, code, verify}) {
  return (
    <>
      <ErrorSummary id="vf-code-errors" errors={problems} />
      <CodeInput
        id="vf-code"
        label={code.label}
        value={code.value}
        length={5}
        onChange={code.onChange}
        onComplete={code.onComplete}
        error={code.error}
        hint={code.hint}
      />
      <Button variant="primary" size="lg" block={true} onClick={verify.onClick}>
        <>{verify.label}</>
      </Button>
    </>
  );
}
