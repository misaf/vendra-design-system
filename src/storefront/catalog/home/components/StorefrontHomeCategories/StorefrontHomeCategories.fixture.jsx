import React from 'react';
import {StorefrontHomeCategories} from './StorefrontHomeCategories.jsx';

const copy = {
  en: {
    title: 'Categories',
    accent: 'to explore',
    region: 'Categories collection',
    previous: 'Previous categories',
    next: 'Next categories',
    item: 'Collection',
    replacement: 'New discoveries'
  },
  fa: {
    title: 'دسته‌ها',
    accent: 'برای کشف',
    region: 'مجموعه دسته‌ها',
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
    href: '#categories-' + number,
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
        <StorefrontHomeCategories categories={records} labels={labels} />
      </main>
    </>
  );
}
