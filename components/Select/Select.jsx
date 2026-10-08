import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {useField, FieldMessage} from '../Field/Field.jsx';
import {cx} from '../utils/cx.js';

// A labelled native <select>. Options are strings or {value, label, disabled}.
// A group picker (DatePicker) can own the message: it passes aria-invalid, aria-errormessage
// and aria-describedby itself, with no hint or error here.
export function Select({
  label,
  hint,
  error,
  options = [],
  placeholder,
  disabled,
  id,
  className,
  style,
  'aria-describedby': describedBy,
  ...rest
}) {
  const {fieldId, messageId, message, controlProps} = useField({id, hint, error, describedBy});
  const invalid = !!error || rest['aria-invalid'] === true || rest['aria-invalid'] === 'true';
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
        className={cx('ag-input', invalid && 'ag-input--error', disabled && 'ag-input--disabled')}
        onClick={focusControl}
      >
        <select
          id={fieldId}
          disabled={disabled}
          {...rest}
          {...controlProps}
          aria-invalid={invalid || undefined}
          aria-errormessage={error ? messageId : rest['aria-errormessage']}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option =>
            typeof option === 'string' ? (
              <option key={option} value={option}>
                {option}
              </option>
            ) : (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            )
          )}
        </select>
        <Icon name="chevron-down" size={16} className="ag-input__chev" />
      </span>
      <FieldMessage id={messageId} error={!!error}>
        {message}
      </FieldMessage>
    </div>
  );
}
