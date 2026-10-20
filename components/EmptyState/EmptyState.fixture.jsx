import React from 'react';
import {Button} from '../atoms/Button/Button.jsx';
import {EmptyState} from './EmptyState.jsx';

export function Fixture() {
  return (
    <div>
      <EmptyState
        icon="heart"
        tone="accent"
        eyebrow="Saved"
        title="Nothing saved"
        titleAccent="yet"
        body="Tap the heart on a design to keep it here."
        actions={<Button href="#shop">Browse the shop</Button>}
        headingLevel={1}
      />
    </div>
  );
}
