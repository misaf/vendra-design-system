import React from 'react';
import {Input as AriaInput, Label, TextArea, TextField} from 'react-aria-components';
import {Icon} from '../Icon/Icon.jsx';
import {useField, FieldMessage} from '../Field/Field.jsx';
import {cx} from '../../utils/cx.js';

// A labelled text field (or textarea with `multiline`) on React Aria's TextField. The label text
// stays inside <label>; the hint or error sits under the control and is linked to it (see Field).
// value or defaultValue and onChange(value) work as React Aria's; the native attributes (type,
// required, autoComplete, dir…) go to the real input.
export function Input({
  label,
  hint,
  error,
  iconStart,
  multiline,
  disabled,
  id,
  value,
  defaultValue,
  onChange,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': labelledBy,
  'aria-describedby': describedBy,
  ...rest
}) {
  const {fieldId, messageId, message, controlProps} = useField({id, hint, error, describedBy});
  const Control = multiline ? TextArea : AriaInput;
  // Clicking the padding around the control (or its icon) focuses the control.
  const focusControl = event => {
    if (event.target === event.currentTarget) document.getElementById(fieldId)?.focus();
  };
  return (
    <TextField
      id={fieldId}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      isDisabled={disabled}
      isInvalid={!!error}
      validationBehavior="aria"
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      aria-describedby={controlProps['aria-describedby']}
      aria-errormessage={controlProps['aria-errormessage']}
      className={cx('ag-field', className)}
      style={style}
    >
      {label && <Label className="ag-field__label">{label}</Label>}
      <span
        className={cx('ag-input', error && 'ag-input--error', disabled && 'ag-input--disabled')}
        onClick={focusControl}
      >
        {iconStart && <Icon name={iconStart} size={18} />}
        <Control {...rest} />
      </span>
      <FieldMessage id={messageId} error={!!error}>
        {message}
      </FieldMessage>
    </TextField>
  );
}
