import React from 'react';
import {PromoCodeField} from './PromoCodeField.jsx';

// WELCOME10 is accepted, anything else refused; inside a form whose submit is reported, to show
// Enter applies the code without submitting it.
export function Fixture({lang}) {
  const [applied, setApplied] = React.useState('');
  const [error, setError] = React.useState();
  const [submitted, setSubmitted] = React.useState(0);
  return (
    <form
      style={{maxWidth: 400}}
      onSubmit={event => {
        event.preventDefault();
        setSubmitted(count => count + 1);
      }}
    >
      <PromoCodeField
        onApply={code => {
          if (code.toUpperCase() === 'WELCOME10') setApplied('WELCOME10 · 10% off');
          else setError(lang === 'fa' ? 'این کد معتبر نیست.' : 'We don’t recognise that code.');
        }}
        onChange={() => setError(undefined)}
        error={error}
        applied={applied}
        onRemove={() => setApplied('')}
      />
      <span data-test="submitted">{submitted}</span>
    </form>
  );
}
