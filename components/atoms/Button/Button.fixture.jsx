import React from 'react';
import {Button} from './Button.jsx';

export function Fixture() {
  const [presses, setPresses] = React.useState(0);
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
      <output data-test="presses">{presses}</output>
    </div>
  );
}
