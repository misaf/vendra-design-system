import React from 'react';
import {PromoCodeField} from './PromoCodeField.jsx';

// WELCOME10 is accepted, anything else refused; inside a form whose submit is reported, to show
// Enter applies the code without submitting it. Below it, the same field tucked behind its
// "Have a promo code?" disclosure, whose answer comes back a moment later, as from a server.
export function Fixture({lang}) {
  return (
    <>
      <PromoForm lang={lang} />
      <PromoForm lang={lang} id="ag-promo-more" collapsible={true} />
    </>
  );
}

function PromoForm({lang, id, collapsible}) {
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
        id={id}
        collapsible={collapsible}
        onApply={code => {
          const answer = () => {
            if (code.toUpperCase() === 'WELCOME10') setApplied('WELCOME10 · 10% off');
            else setError(lang === 'fa' ? 'این کد معتبر نیست.' : 'We don’t recognise that code.');
          };
          if (collapsible) setTimeout(answer, 400);
          else answer();
        }}
        onChange={() => setError(undefined)}
        error={error}
        applied={applied}
        onRemove={() => setApplied('')}
      />
      <span data-test={collapsible ? 'submitted-more' : 'submitted'}>{submitted}</span>
    </form>
  );
}
