import React from 'react';
import {cx} from '../utils/cx.js';

// The ids and ARIA wiring every form control shares. The hint (or the error, which replaces it)
// sits outside the label and is linked with aria-describedby; an error also sets aria-invalid
// and aria-errormessage. Spread `controlProps` onto the control after any other props.
export function useField({id, hint, error, describedBy}) {
  const generatedId = React.useId();
  const fieldId = id || generatedId;
  const messageId = fieldId + '-hint';
  const message = error || hint;
  return {
    fieldId,
    messageId,
    message,
    controlProps: {
      'aria-invalid': error ? true : undefined,
      'aria-describedby': cx(message && messageId, describedBy) || undefined,
      'aria-errormessage': error ? messageId : undefined
    }
  };
}

// The hint or error under a control. Renders nothing without a message.
export function FieldMessage({id, error, children}) {
  if (!children) return null;
  return (
    <span id={id} className={cx('ag-field__hint', error && 'ag-field__hint--error')}>
      {children}
    </span>
  );
}
