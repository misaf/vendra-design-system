import React from 'react';
import {FieldMessage, useField} from './Field.jsx';

// A plain <input> wired with useField, as a custom control would be.
function Control({id, label, hint, error}) {
  const {fieldId, messageId, message, controlProps} = useField({id, hint, error});
  return (
    <div className="ag-field">
      <label htmlFor={fieldId}>{label}</label>
      <input id={fieldId} className="ag-input" {...controlProps} />
      <FieldMessage id={messageId} error={!!error}>
        {message}
      </FieldMessage>
    </div>
  );
}

export function Fixture() {
  return (
    <div style={{display: 'grid', gap: 16}}>
      <Control label="Card note" hint="Up to 200 characters" />
      <Control id="phone" label="Phone" hint="We text you" error="Enter a mobile number" />
      <Control label="Name" />
    </div>
  );
}
