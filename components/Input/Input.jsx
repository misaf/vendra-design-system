import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {useField, FieldMessage} from '../Field/Field.jsx';
import {cx} from '../utils/cx.js';

// A labelled text field (or textarea with `multiline`). The label text stays inside <label>;
// the hint or error sits under the control and is linked to it (see Field).
export function Input({
  label,
  hint,
  error,
  iconStart,
  multiline,
  disabled,
  id,
  className,
  style,
  'aria-describedby': describedBy,
  ...rest
}) {
  const {fieldId, messageId, message, controlProps} = useField({id, hint, error, describedBy});
  const Control = multiline ? 'textarea' : 'input';
  // Clicking the padding around the control (or its icon) focuses the control.
  const focusControl = event => {
    if (event.target === event.currentTarget) document.getElementById(fieldId)?.focus();
  };
  return (
    <div className={cx('ag-field', className)} style={style}>
      {label && (
        <label className="ag-field__label" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <span
        className={cx('ag-input', error && 'ag-input--error', disabled && 'ag-input--disabled')}
        onClick={focusControl}
      >
        {iconStart && <Icon name={iconStart} size={18} />}
        <Control id={fieldId} disabled={disabled} {...rest} {...controlProps} />
      </span>
      <FieldMessage id={messageId} error={!!error}>
        {message}
      </FieldMessage>
    </div>
  );
}
