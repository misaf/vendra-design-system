import React from 'react';
import {Switch as AriaSwitch} from 'react-aria-components';
import {cx} from '../../utils/cx.js';

// An on/off toggle on React Aria (role="switch"): the label is the whole target, and the state shows
// as data-selected, data-focus-visible and data-disabled on it. It takes checked/defaultChecked,
// disabled, name, value and onChange(checked).
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
  return (
    <AriaSwitch
      {...rest}
      name={name}
      value={value}
      isSelected={checked}
      defaultSelected={defaultChecked}
      isDisabled={disabled}
      onChange={onChange}
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
