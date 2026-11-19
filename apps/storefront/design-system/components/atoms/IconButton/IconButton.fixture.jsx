import React from 'react';
import {IconButton} from './IconButton.jsx';

export function Fixture() {
  const [saved, setSaved] = React.useState(false);
  return (
    <div style={{display: 'flex', gap: 12}}>
      <IconButton icon="heart" label="Save" active={saved} onClick={() => setSaved(!saved)} />
      <IconButton icon="shopping-bag" label="Bag, 2 items" count="2" href="#bag" />
      <IconButton icon="x" label="Close" disabled />
      {/* On a dark surface, as in the footer and the consent banner. */}
      <div
        className="dark"
        style={{display: 'flex', gap: 8, padding: 8, background: 'var(--surface-inverse)'}}
      >
        <IconButton icon="instagram" label="Instagram" variant="secondary" inverse href="#ig" />
        <IconButton icon="x" label="Close banner" inverse />
      </div>
    </div>
  );
}
