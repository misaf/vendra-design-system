import React from 'react';
import {ProductCard} from './ProductCard.jsx';

export function Fixture() {
  const [favorite, setFavorite] = React.useState(false);
  const [opened, setOpened] = React.useState('');
  const [allowNavigation, setAllowNavigation] = React.useState(false);
  const [linkClicks, setLinkClicks] = React.useState(0);
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 240px)', gap: 24}}>
      <ProductCard
        name="Lavender Whisper"
        subtitle="Peach, pink & violet roses"
        price="490,000 Toman"
        compareAt="560,000 Toman"
        badge="New"
        badgeTone="accent"
        stock={{status: 'low', count: 2}}
        href="#lavender"
        onClick={event => {
          setLinkClicks(value => value + 1);
          if (!allowNavigation) event.preventDefault();
        }}
        favorite={favorite}
        onFavorite={() => setFavorite(!favorite)}
      />
      <ProductCard
        name="Garden Rose"
        price="3,100,000 Toman"
        stock={{status: 'in'}}
        onClick={() => setOpened('garden')}
      />
      <output data-test="opened">{opened}</output>
      <label>
        <input
          type="checkbox"
          checked={allowNavigation}
          onChange={event => setAllowNavigation(event.target.checked)}
        />
        Allow link navigation
      </label>
      <span data-test="link-clicks">{linkClicks}</span>
    </div>
  );
}
