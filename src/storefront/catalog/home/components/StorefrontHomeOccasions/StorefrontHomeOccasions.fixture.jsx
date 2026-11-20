import React from 'react';
import {StorefrontHomeOccasions} from './StorefrontHomeOccasions.jsx';

const copy = {
  en: {
    title: 'Occasions',
    accent: 'to explore',
    description: 'Discover something for your next visit.',
    region: 'Occasions collection',
    previous: 'Previous occasions',
    next: 'Next occasions',
    item: 'Collection',
    replacement: 'New discoveries'
  },
  fa: {
    title: 'مناسبت‌ها',
    accent: 'برای کشف',
    description: 'برای دیدار بعدی چیزی تازه پیدا کنید.',
    region: 'مجموعه مناسبت‌ها',
    previous: 'موارد قبلی',
    next: 'موارد بعدی',
    item: 'مجموعه',
    replacement: 'کشف‌های تازه'
  }
};
export function Fixture({lang}) {
  const [count, setCount] = React.useState('six');
  const [alternate, setAlternate] = React.useState(false);
  const t = copy[lang];
  const length = count === 'empty' ? 0 : count === 'one' ? 1 : 6;
  const numbers = Array.from({length}, (_, index) => index + 1);
  if (alternate) numbers.reverse();
  const records = numbers.map(number => ({
    label: t.item + ' ' + number,
    href: '#occasions-' + number,
    image:
      number === 2
        ? undefined
        : {
            src: '/assets/categories/bouquets.webp',
            srcSet: '/assets/categories/bouquets.webp 640w'
          },
    count: number + ' designs'
  }));
  const labels = {
    ...t,
    title: alternate ? t.replacement : t.title,
    titleAccent: t.accent,
    count: new Intl.NumberFormat(lang).format(length) + (lang === 'fa' ? ' مورد' : ' items')
  };
  return (
    <>
      <label>
        Items
        <select value={count} onChange={event => setCount(event.target.value)}>
          {['six', 'one', 'empty'].map(value => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={alternate}
          onChange={event => setAlternate(event.target.checked)}
        />
        Alternate content
      </label>
      <main>
        <StorefrontHomeOccasions
          occasions={records}
          labels={labels}
          frame={alternate ? 'soft' : 'arch'}
        />
      </main>
    </>
  );
}
