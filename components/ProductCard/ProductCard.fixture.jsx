import React from 'react';
import {ProductCard} from './ProductCard.jsx';

export function Fixture({lang = 'en'}) {
  const [favorite, setFavorite] = React.useState(false);
  const [opened, setOpened] = React.useState('');
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
        favorite={favorite}
        onFavorite={() => setFavorite(!favorite)}
      />
      <ProductCard
        name="Garden Rose"
        price="3,100,000 Toman"
        stock={{status: 'in'}}
        onClick={() => setOpened('garden')}
      />
      <ProductCard
        name={lang === 'fa' ? 'رز و لیسیانتوس' : 'Roses and lisianthus'}
        subtitle={lang === 'fa' ? 'باکس گل' : 'Flower box'}
        code="VF-7K2M4Q"
        price={lang === 'fa' ? '۴٬۱۰۰٬۰۰۰ تومان' : '4,100,000 Toman'}
        href="#identified"
        stock={{status: 'out'}}
      />
      <output data-test="opened">{opened}</output>
    </div>
  );
}
