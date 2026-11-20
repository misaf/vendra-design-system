import React from 'react';
import {ErrorSummary} from './ErrorSummary.jsx';

// Two errors with their fields, a third pointing at a group (focuses its first control), and a
// summary with one error. The fields sit below a spacer so the links have to scroll.
export function Fixture() {
  const [shown, setShown] = React.useState(false);
  return (
    <div style={{display: 'grid', gap: 16, maxWidth: 480}}>
      <button type="button" onClick={() => setShown(true)}>
        Send
      </button>
      {shown && (
        <ErrorSummary
          className="several"
          autoFocus
          errors={[
            {text: 'Enter your name.', target: 'fixture-name'},
            {text: 'Enter a mobile number.', target: 'fixture-phone'},
            {text: 'Choose a delivery time.', target: 'fixture-times'}
          ]}
        />
      )}
      <ErrorSummary
        className="single"
        errors={[{text: 'Enter your name.', target: 'fixture-name'}]}
      />
      <ErrorSummary className="none" errors={[]} />
      <div style={{height: 1200}} />
      <label htmlFor="fixture-name">Name</label>
      <input id="fixture-name" />
      <label htmlFor="fixture-phone">Mobile</label>
      <input id="fixture-phone" />
      <fieldset id="fixture-times">
        <legend>Delivery time</legend>
        <label>
          <input type="radio" name="time" /> Morning
        </label>
      </fieldset>
    </div>
  );
}
