import React from 'react';
import {SearchField} from './SearchField.jsx';

export function Fixture() {
  const [query, setQuery] = React.useState('peony');
  const [submitted, setSubmitted] = React.useState('');
  const [submissions, setSubmissions] = React.useState(0);
  const [clears, setClears] = React.useState(0);
  const [focusedOnClear, setFocusedOnClear] = React.useState(false);
  return (
    <div style={{display: 'grid', gap: 16, maxWidth: 420}}>
      <SearchField
        id="find"
        label="Search the shop"
        hint="Name, colour or code"
        value={query}
        onChange={setQuery}
        onSubmit={value => {
          setSubmitted(value);
          setSubmissions(count => count + 1);
        }}
        onClear={() => {
          setClears(count => count + 1);
          setFocusedOnClear(document.activeElement?.id === 'find');
        }}
      />
      <SearchField aria-label="Search orders" error="Nothing matches" />
      <output data-test="query">{query}</output>
      <output data-test="submitted">{submitted}</output>
      <output data-test="submissions">{submissions}</output>
      <output data-test="clears">{clears}</output>
      <output data-test="focused-on-clear">{String(focusedOnClear)}</output>
    </div>
  );
}
