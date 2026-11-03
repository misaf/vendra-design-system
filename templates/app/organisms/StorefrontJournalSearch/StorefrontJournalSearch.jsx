import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontJournalSearch({label, value, onChange}) {
  return <DS.SearchField label={label} value={value} onChange={onChange} />;
}
