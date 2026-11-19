import React from 'react';
import {StorefrontHomeStudio} from './StorefrontHomeStudio.jsx';

const copy = {
  en: {
    eyebrow: 'From the studio',
    title: 'Studio',
    accent: 'designs',
    description: 'Explore the current collection.',
    all: 'Explore all designs',
    allShort: 'View all',
    allAccessible: 'View all ready designs',
    region: 'Studio designs',
    previous: 'Previous designs',
    next: 'Next designs',
    photo: 'Photo coming soon',
    save: 'Save design',
    sub: 'Bouquet',
    badge: 'Ready'
  },
  fa: {
    eyebrow: 'از استودیو',
    title: 'استودیو',
    accent: 'طرح‌ها',
    description: 'مجموعه کنونی را ببینید.',
    all: 'دیدن همه طرح‌ها',
    allShort: 'دیدن همه',
    allAccessible: 'دیدن همه طرح‌های آماده',
    region: 'طرح‌های استودیو',
    previous: 'طرح‌های قبلی',
    next: 'طرح‌های بعدی',
    photo: 'عکس به‌زودی',
    save: 'ذخیره طرح',
    sub: 'دسته‌گل',
    badge: 'آماده'
  }
};
const codes = ['VF-7K2M4Q', 'VF-8P3N5R', 'VF-3P8R1T', 'VF-2N4K6M', 'VF-9Q7S5T', 'VF-6R4P2N'];
export function Fixture({lang}) {
  const [count, setCount] = React.useState('six');
  const [favorites, setFavorites] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [soft, setSoft] = React.useState(false);
  const t = copy[lang];
  const record = event => setEvents(current => [...current, event]);
  const selected = count === 'empty' ? [] : count === 'one' ? codes.slice(0, 1) : codes;
  const products = selected.map((code, index) => ({
    name: code,
    sub: t.sub,
    price: index ? '3,000,000' : '2,000,000',
    images:
      index === 2
        ? []
        : [
            {
              src: '/assets/categories/bouquets.webp',
              srcSet: '/assets/categories/bouquets.webp 640w',
              alt: code
            }
          ],
    stock: {status: index === 2 ? 'out' : 'in'},
    badge: index === 0 ? t.badge : undefined,
    fav: favorites.includes(code),
    toggleFav: () => {
      record('favorite:' + code);
      setFavorites(current =>
        current.includes(code) ? current.filter(value => value !== code) : [...current, code]
      );
    },
    href: '#design-' + code,
    select: event => {
      event.preventDefault();
      record('select:' + code);
    }
  }));
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
        <input type="checkbox" checked={soft} onChange={event => setSoft(event.target.checked)} />
        Soft frame
      </label>
      <span data-test="events" style={{overflowWrap: 'anywhere'}}>
        {JSON.stringify(events)}
      </span>
      <main>
        <StorefrontHomeStudio
          products={products}
          labels={{
            ...t,
            count:
              new Intl.NumberFormat(lang).format(products.length) +
              (lang === 'fa' ? ' طرح' : ' designs')
          }}
          shopHref="#shop"
          frame={soft ? 'soft' : 'arch'}
        />
      </main>
    </>
  );
}
