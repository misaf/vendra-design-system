import React from 'react';
import {ToggleButton} from 'react-aria-components';

// The EN / فا toggle: one React Aria ToggleButton (aria-pressed) per language, each marked with its
// own `lang`.
export function LanguageSwitch({
  value = 'en',
  onChange,
  label = 'Language',
  options = [
    {id: 'en', label: 'EN'},
    {id: 'fa', label: 'فا'}
  ]
}) {
  return (
    <div className="ag-lang" role="group" aria-label={label}>
      {options.map(o => (
        <ToggleButton
          key={o.id}
          lang={o.id}
          isSelected={value === o.id}
          onChange={() => onChange && onChange(o.id)}
        >
          {o.label}
        </ToggleButton>
      ))}
    </div>
  );
}
