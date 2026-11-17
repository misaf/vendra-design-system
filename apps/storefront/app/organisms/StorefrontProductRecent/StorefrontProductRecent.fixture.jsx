import React from 'react';
import {StorefrontProductRecent} from './StorefrontProductRecent.jsx';

const copy = {
  en: {
    eyebrow: 'Your browsing',
    title: 'Recently',
    accent: 'viewed',
    region: 'Recent designs',
    previous: 'Previous designs',
    next: 'Next designs',
    photo: 'Photo coming soon',
    save: 'Save design',
    sub: 'Bouquet'
  },
  fa: {
    eyebrow: 'مرور شما',
    title: 'تازه',
    accent: 'دیده‌شده',
    region: 'طرح‌های اخیر',
    previous: 'طرح‌های قبلی',
    next: 'طرح‌های بعدی',
    photo: 'عکس به‌زودی',
    save: 'ذخیره طرح',
    sub: 'دسته‌گل'
  }
};
const codes = ['VF-7K2M4Q', 'VF-8P3N5R', 'VF-3P8R1T', 'VF-2N4K6M', 'VF-9Q7S5T', 'VF-6R4P2N'];
export function Fixture({lang}) {
  const [count, setCount] = React.useState('six');
  const [resetKey, setResetKey] = React.useState(0);
  const [favorites, setFavorites] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const t = copy[lang];
  const record = value => setEvents(current => [...current, value]);
  const selected = count === 'empty' ? [] : count === 'one' ? codes.slice(0, 1) : codes;
  const products = selected.map((code, index) => ({
    name: code,
    sub: t.sub,
    price: index ? '3,000,000' : '2,000,000',
    images:
      index === 1
        ? []
        : [
            {
              src: '/assets/categories/bouquets.webp',
              srcSet: '/assets/categories/bouquets.webp 640w',
              alt: code
            }
          ],
    stock: {status: index === 1 ? 'out' : 'in'},
    fav: favorites.includes(code),
    toggleFav: () => {
      record('favorite:' + code);
      setFavorites(current =>
        current.includes(code) ? current.filter(value => value !== code) : [...current, code]
      );
    },
    href: '?page=product&code=' + code,
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
      <button type="button" onClick={() => setResetKey(value => value + 1)}>
        Reset carousel
      </button>
      <span data-test="events" style={{overflowWrap: 'anywhere'}}>
        {JSON.stringify(events)}
      </span>
      <main>
        <StorefrontProductRecent
          products={products}
          labels={{
            ...t,
            count:
              lang === 'fa'
                ? String(selected.length).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]) + ' طرح'
                : selected.length + ' designs'
          }}
          resetKey={resetKey}
        />
      </main>
    </>
  );
}
