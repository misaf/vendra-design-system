import React from 'react';
import {Checkbox as AriaCheckbox} from 'react-aria-components';
import {Icon} from '../Icon/Icon.jsx';
import {useField, FieldMessage} from '../Field/Field.jsx';
import {cx} from '../utils/cx.js';

// A checkbox on React Aria: the label is the whole target, and the state shows as data-selected,
// data-focus-visible and data-disabled on it. It takes the usual input props (checked,
// defaultChecked, disabled, required, name, value, onChange(event)); onChange gets an event whose
// target is the real checkbox, already set to its new state. With a hint or error, the pair is
// wrapped in .ag-field and the message is linked to the checkbox (see Field).
export function Checkbox({
  label,
  hint,
  error,
  disabled,
  required,
  checked,
  defaultChecked,
  onChange,
  name,
  value,
  id,
  className,
  style,
  'aria-describedby': describedBy,
  ...rest
}) {
  const {messageId, message, controlProps} = useField({id, hint, error, describedBy});
  const inputRef = React.useRef(null);
  const box = (
    <AriaCheckbox
      {...rest}
      id={id}
      inputRef={inputRef}
      name={name}
      value={value}
      isSelected={checked}
      defaultSelected={defaultChecked}
      isDisabled={disabled}
      isRequired={required}
      isInvalid={!!error}
      aria-describedby={controlProps['aria-describedby']}
      onChange={() =>
        onChange &&
        onChange({target: inputRef.current, currentTarget: inputRef.current, type: 'change'})
      }
      className={cx(
        'ag-check ag-check--checkbox',
        error && 'ag-check--error',
        disabled && 'ag-check--disabled',
        !message && className
      )}
      style={message ? undefined : style}
    >
      <span className="ag-check__box">
        <Icon name="check" size={14} />
      </span>
      {label && <span>{label}</span>}
    </AriaCheckbox>
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
