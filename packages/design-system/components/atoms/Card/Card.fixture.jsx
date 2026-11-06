import React from 'react';
import {Card} from './Card.jsx';

export function Fixture() {
  return (
    <div style={{display: 'grid', gap: 16}}>
      <Card data-test="default">Delivery to Karaj</Card>
      <Card variant="sunken" padding="1rem" data-test="sunken">
        Same day before 18:00
      </Card>
      <Card variant="raised" padding={8} role="region" aria-label="Summary">
        Raised
      </Card>
    </div>
  );
}
