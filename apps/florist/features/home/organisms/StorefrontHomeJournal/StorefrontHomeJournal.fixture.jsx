import React from 'react';
import {StorefrontHomeJournal} from './StorefrontHomeJournal.jsx';

const copy = {
  en: {
    title: 'Journal',
    accent: 'to explore',
    description: 'Discover something for your next visit.',
    eyebrow: 'From the studio',
    all: 'Read the journal',
    region: 'Journal collection',
    previous: 'Previous journal',
    next: 'Next journal',
    item: 'Story',
    meta: 'Studio notes',
    excerpt: 'A closer look at seasonal flowers.',
    replacement: 'New discoveries'
  },
  fa: {
    title: 'مجله',
    accent: 'برای کشف',
    description: 'برای دیدار بعدی چیزی تازه پیدا کنید.',
    eyebrow: 'از استودیو',
    all: 'خواندن مجله',
    region: 'مجموعه مجله',
    previous: 'موارد قبلی',
    next: 'موارد بعدی',
    item: 'داستان',
    meta: 'یادداشت استودیو',
    excerpt: 'نگاهی نزدیک به گل‌های فصل.',
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
    title: t.item + ' ' + number,
    href: '#journal-' + number,
    image:
      number === 2
        ? undefined
        : {
            src: '/assets/categories/bouquets.webp',
            srcSet: '/assets/categories/bouquets.webp 640w'
          },
    excerpt: t.excerpt,
    meta: t.meta
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
        <StorefrontHomeJournal posts={records} labels={labels} journalHref="#journal" />
      </main>
    </>
  );
}
