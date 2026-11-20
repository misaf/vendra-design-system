import React from 'react';
import {CodeInput} from '../../../../../components/ui/patterns/atoms/CodeInput/CodeInput.jsx';
import {Dialog} from '../../../../../components/ui/components/Dialog/Dialog.jsx';

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
    <Dialog open={open} onClose={onClose} title={labels.title} maxWidth={400}>
      <CodeInput
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
    </Dialog>
  );
}
