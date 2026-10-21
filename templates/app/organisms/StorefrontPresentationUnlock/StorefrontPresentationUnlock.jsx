import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPresentationUnlock({
  open,
  value,
  error,
  labels,
  onChange,
  onComplete,
  onClose
}) {
  return (
    <DS.Dialog open={open} onClose={onClose} title={labels.title} maxWidth={400}>
      <DS.CodeInput
        id="vf-presentation-unlock"
        label={labels.hint}
        length={4}
        webOtp={false}
        autoFocus={true}
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        error={error}
      />
    </DS.Dialog>
  );
}
