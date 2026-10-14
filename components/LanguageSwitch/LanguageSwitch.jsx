import React from 'react';
import {ToggleButton} from 'react-aria-components';
import {useMessages} from '../utils/messages.js';
import {useTrack} from '../utils/track.js';

// The EN / فا toggle: one React Aria ToggleButton (aria-pressed) per language, each marked with its
// own `lang`. Choosing one reports `language_switch` (VendraProvider's onEvent).
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
  const track = useTrack();
  return (
    <div className="ag-lang" role="group" aria-label={text.label}>
      {options.map(o => (
        <ToggleButton
          key={o.id}
          lang={o.id}
          isSelected={value === o.id}
          onChange={() => {
            if (value !== o.id) track('language_switch', {to: o.id});
            if (onChange) onChange(o.id);
          }}
        >
          {o.label}
        </ToggleButton>
      ))}
    </div>
  );
}
