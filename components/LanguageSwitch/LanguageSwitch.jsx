import React from 'react';
import {ToggleButton} from 'react-aria-components';
import {useMessages} from '../utils/messages.js';

// The EN / فا toggle: one React Aria ToggleButton (aria-pressed) per language, each marked with its
// own `lang`.
export function LanguageSwitch({
  value = 'en',
  onChange,
  label,
  options = [
    {id: 'en', label: 'EN'},
    {id: 'fa', label: 'فا'}
  ]
}) {
  const text = useMessages('LanguageSwitch', {label});
  return (
    <div className="ag-lang" role="group" aria-label={text.label}>
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
