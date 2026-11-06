import React from 'react';
import {CategoryCard} from './CategoryCard.jsx';

export function Fixture() {
  const [opened, setOpened] = React.useState('');
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 200px)', gap: 24}}>
      <CategoryCard label="Orchids" count="12 designs" href="#orchids" />
      <CategoryCard label="Dried" aspect="1/1" onClick={() => setOpened('dried')} />
      <div style={{width: 96}}>
        <CategoryCard label="Bouquets" count="8 designs" frame="circle" href="#bouquets" />
      </div>
      <output data-test="opened">{opened}</output>
    </div>
  );
}
