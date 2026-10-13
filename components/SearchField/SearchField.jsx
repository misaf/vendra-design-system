import React from 'react';
import {
  Button,
  Input as AriaInput,
  Label,
  SearchField as AriaSearchField
} from 'react-aria-components';
import {Icon} from '../Icon/Icon.jsx';
import {useField, FieldMessage} from '../Field/Field.jsx';
import {cx} from '../utils/cx.js';
import {useMessages} from '../utils/messages.js';

// A search box on React Aria's SearchField, styled like Input: a search icon, the text, and a clear
// button once there is text. Esc clears the text, Enter calls onSubmit(value). value or defaultValue
// and onChange(value) work as React Aria's; the native attributes (name, placeholder,
// autoComplete…) go to the real input.
export function SearchField({
  label,
  hint,
  error,
  clearLabel,
  disabled,
  id,
  value,
  defaultValue,
  onChange,
  onSubmit,
  onClear,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': labelledBy,
  'aria-describedby': describedBy,
  ...rest
}) {
  const {fieldId, messageId, message, controlProps} = useField({id, hint, error, describedBy});
  const text = useMessages('SearchField', {clear: clearLabel});
  // Clicking the padding around the control (or its icon) focuses the control.
  const focusControl = event => {
    if (event.target === event.currentTarget) document.getElementById(fieldId)?.focus();
  };
  return (
    <AriaSearchField
      id={fieldId}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onSubmit={onSubmit}
      onClear={onClear}
      isDisabled={disabled}
      isInvalid={!!error}
      validationBehavior="aria"
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      aria-describedby={controlProps['aria-describedby']}
      aria-errormessage={controlProps['aria-errormessage']}
      className={cx('ag-field ag-search', className)}
      style={style}
    >
      {label && <Label className="ag-field__label">{label}</Label>}
      <span
        className={cx('ag-input', error && 'ag-input--error', disabled && 'ag-input--disabled')}
        onClick={focusControl}
      >
        <Icon name="search" size={18} />
        <AriaInput {...rest} />
        <Button className="ag-search__clear" aria-label={text.clear}>
          <Icon name="x" size={16} />
        </Button>
      </span>
      <FieldMessage id={messageId} error={!!error}>
        {message}
      </FieldMessage>
    </AriaSearchField>
  );
}
