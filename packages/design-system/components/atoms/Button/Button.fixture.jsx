import React from 'react';
import {Button} from './Button.jsx';

export function Fixture() {
  const [presses, setPresses] = React.useState(0);
  const [pending, setPending] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const [requests, setRequests] = React.useState(0);
  const [submissions, setSubmissions] = React.useState(0);
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>
      <Button iconEnd="arrow-right" onClick={() => setPresses(n => n + 1)}>
        Add to bag
      </Button>
      <Button variant="secondary" href="#shop">
        Shop
      </Button>
      <Button variant="ghost" href="https://wa.me/989129333034" target="_blank">
        WhatsApp
      </Button>
      <Button loading loadingLabel="Paying…">
        Pay
      </Button>
      <Button disabled>Sold out</Button>
      <Button href="#gone" disabled>
        Unavailable
      </Button>
      <form
        onSubmit={event => {
          event.preventDefault();
          setSubmissions(n => n + 1);
        }}
      >
        <input aria-label="Request note" />
        {!finished && (
          <Button
            type="submit"
            loading={pending}
            loadingLabel="Sending request…"
            onClick={() => {
              setRequests(n => n + 1);
              setPending(true);
            }}
          >
            Send request
          </Button>
        )}
        <button type="button" onClick={() => setFinished(true)}>
          Complete request
        </button>
        <button type="button" onClick={() => setPending(false)}>
          Fail request
        </button>
        <output data-test="requests">{requests}</output>
        <output data-test="submissions">{submissions}</output>
      </form>
      <output data-test="presses">{presses}</output>
    </div>
  );
}
