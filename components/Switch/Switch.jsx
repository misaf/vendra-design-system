import React from 'react';
import {Switch as AriaSwitch} from 'react-aria-components';
import {cx} from '../utils/cx.js';

// An on/off toggle on React Aria (role="switch"): the label is the whole target, and the state shows
// as data-selected, data-focus-visible and data-disabled on it. It takes the usual input props
// (checked, defaultChecked, disabled, name, value, onChange(event)); onChange gets an event whose
// target is the real switch input, already set to its new state.
export function Switch({
  label,
  checked,
  defaultChecked,
  disabled,
  onChange,
  name,
  value,
  className = '',
  style,
  ...rest
}) {
  const inputRef = React.useRef(null);
  return (
    <AriaSwitch
      {...rest}
      inputRef={inputRef}
      name={name}
      value={value}
      isSelected={checked}
      defaultSelected={defaultChecked}
      isDisabled={disabled}
      onChange={() =>
        onChange &&
        onChange({target: inputRef.current, currentTarget: inputRef.current, type: 'change'})
      }
      className={cx('ag-switch', className)}
      style={style}
    >
      <span className="ag-switch__track">
        <span className="ag-switch__thumb"></span>
      </span>
      {label && <span>{label}</span>}
    </AriaSwitch>
  );
}
