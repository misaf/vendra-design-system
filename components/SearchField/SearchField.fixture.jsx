import React from 'react';
import {SearchField} from './SearchField.jsx';

export function Fixture() {
  const [query, setQuery] = React.useState('peony');
  const [submitted, setSubmitted] = React.useState('');
  return (
    <div style={{display: 'grid', gap: 16, maxWidth: 420}}>
      <SearchField
        id="find"
        label="Search the shop"
        hint="Name, colour or code"
        value={query}
        onChange={setQuery}
        onSubmit={setSubmitted}
      />
      <SearchField aria-label="Search orders" error="Nothing matches" />
      <output data-test="query">{query}</output>
      <output data-test="submitted">{submitted}</output>
    </div>
  );
}
