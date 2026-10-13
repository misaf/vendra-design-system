import React from 'react';
import {IconButton} from './IconButton.jsx';

export function Fixture() {
  const [saved, setSaved] = React.useState(false);
  return (
    <div style={{display: 'flex', gap: 12}}>
      <IconButton icon="heart" label="Save" active={saved} onClick={() => setSaved(!saved)} />
      <IconButton icon="shopping-bag" label="Bag, 2 items" count="2" href="#bag" />
      <IconButton icon="x" label="Close" disabled />
    </div>
  );
}
