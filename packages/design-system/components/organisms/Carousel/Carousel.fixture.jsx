import React from 'react';
import {Carousel} from './Carousel.jsx';

export function Fixture() {
  return (
    <div style={{maxWidth: 480}}>
      <Carousel label="New arrivals" arrows itemMin="180px" perView={2} bleed={false}>
        {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map(name => (
          <div key={name} style={{height: 60, background: 'var(--surface-muted)'}}>
            {name}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
