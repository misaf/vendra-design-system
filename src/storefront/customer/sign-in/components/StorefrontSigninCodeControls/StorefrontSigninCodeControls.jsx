import React from 'react';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {CodeInput} from '../../../../../design-system/components/CodeInput/CodeInput.jsx';
import {ErrorSummary} from '../../../../../design-system/components/ErrorSummary/ErrorSummary.jsx';

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
