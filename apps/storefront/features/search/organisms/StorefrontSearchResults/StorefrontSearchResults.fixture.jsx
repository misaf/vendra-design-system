import React from 'react';
import {StorefrontSearchResults} from './StorefrontSearchResults.jsx';

export function Fixture({lang}) {
  const fa = lang === 'fa';
  const codes = ['VF-7K2M4Q', 'VF-8P3N5R', 'VF-9A4B6C'];
  const [empty, setEmpty] = React.useState(false);
  const [single, setSingle] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const [calls, setCalls] = React.useState(0);
  const ids = empty ? [] : single ? codes.slice(0, 1) : codes;
  const results = ids.map((name, index) => ({
    name,
    href: '#' + name,
    sub: fa ? 'گل‌های فصل، ساخته‌شده در استودیو' : 'Seasonal flowers, made in the studio',
    price:
      new Intl.NumberFormat(fa ? 'fa-IR' : 'en-US').format(490000 + index * 10000) +
      (fa ? ' تومان' : ' toman'),
    image:
      index === 0
        ? {
            src: '/assets/categories/bouquets.webp',
            srcSet: '/assets/categories/bouquets.webp 640w',
            alt: (fa ? 'عکس ' : 'Photo ') + name
          }
        : undefined,
    select: () => {
      setSelected(name);
      setCalls(count => count + 1);
    }
  }));
  return (
    <div>
      <StorefrontSearchResults
        countLabel={
          new Intl.NumberFormat(fa ? 'fa-IR' : 'en-US').format(ids.length) +
          (fa ? ' نتیجه' : ids.length === 1 ? ' result' : ' results')
        }
        results={results}
      />
      <label>
        <input
          type="checkbox"
          checked={single}
          onChange={event => setSingle(event.target.checked)}
        />
        {fa ? 'یک نتیجه' : 'Single result'}
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />
        {fa ? 'بدون نتیجه' : 'No results'}
      </label>
      <span data-test="selected">{selected}</span>
      <span data-test="calls">{calls}</span>
    </div>
  );
}
