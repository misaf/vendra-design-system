import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {useField, FieldMessage} from '../Field/Field.jsx';
import {cx} from '../utils/cx.js';

// A native checkbox inside its <label>. With a hint or error, the pair is wrapped in .ag-field
// and the message is linked to the input (see Field).
export function Checkbox({
  label,
  hint,
  error,
  disabled,
  id,
  className,
  style,
  'aria-describedby': describedBy,
  ...rest
}) {
  const {messageId, message, controlProps} = useField({id, hint, error, describedBy});
  const box = (
    <label
      className={cx(
        'ag-check ag-check--checkbox',
        error && 'ag-check--error',
        disabled && 'ag-check--disabled',
        !message && className
      )}
      style={message ? undefined : style}
    >
      <input type="checkbox" id={id} disabled={disabled} {...rest} {...controlProps} />
      <span className="ag-check__box">
        <Icon name="check" size={14} />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
  if (!message) return box;
  return (
    <div className={cx('ag-field ag-field--check', className)} style={style}>
      {box}
      <FieldMessage id={messageId} error={!!error}>
        {message}
      </FieldMessage>
    </div>
  );
}
