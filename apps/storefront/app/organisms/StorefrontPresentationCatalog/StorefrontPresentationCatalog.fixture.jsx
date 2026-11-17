import React from 'react';
import {StorefrontPresentationCatalog} from './StorefrontPresentationCatalog.jsx';
const copy = {
  en: {
    title: 'Design catalog',
    ready: 'Ready',
    sold: 'Sold out',
    empty: 'No designs',
    body: 'Try another category.',
    clear: 'Clear filters',
    star: 'Shortlist'
  },
  fa: {
    title: 'فهرست طرح‌ها',
    ready: 'آماده',
    sold: 'ناموجود',
    empty: 'طرحی پیدا نشد',
    body: 'دسته دیگری را امتحان کنید.',
    clear: 'پاک کردن فیلترها',
    star: 'انتخاب'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [noResults, setNoResults] = React.useState(false);
  const [prices, setPrices] = React.useState(true);
  const [empty, setEmpty] = React.useState(false);
  const [stars, setStars] = React.useState([]);
  const [opened, setOpened] = React.useState('');
  const [openCount, setOpenCount] = React.useState(0);
  const [starCount, setStarCount] = React.useState(0);
  const [cleared, setCleared] = React.useState(0);
  return (
    <main>
      <h1>{t.title}</h1>
      <label>
        <input
          type="checkbox"
          checked={noResults}
          onChange={event => setNoResults(event.target.checked)}
        />{' '}
        Show no results
      </label>
      <label>
        <input
          type="checkbox"
          checked={prices}
          onChange={event => setPrices(event.target.checked)}
        />{' '}
        Show prices
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Empty tiles
      </label>
      <StorefrontPresentationCatalog
        tiles={
          empty
            ? []
            : ['VF-7K2M4Q', 'VF-8P3N5R'].map((id, index) => ({
                id,
                ready: index === 0,
                price: index === 0 ? '2,000,000' : '3,000,000',
                image: {
                  src: '/assets/categories/bouquets.webp',
                  srcSet: '/assets/categories/bouquets.webp 640w'
                },
                openDescription: id + ' — ' + (index === 0 ? t.ready : t.sold),
                open: () => {
                  setOpened(id);
                  setOpenCount(count => count + 1);
                },
                starLabel: t.star + ' ' + id,
                starred: stars.includes(id),
                star: () => {
                  setStars(stars =>
                    stars.includes(id) ? stars.filter(value => value !== id) : [...stars, id]
                  );
                  setStarCount(count => count + 1);
                }
              }))
        }
        noResults={noResults}
        showPrices={prices}
        readyLabel={t.ready}
        emptyTitle={t.empty}
        emptyBody={t.body}
        clearLabel={t.clear}
        onClear={() => setCleared(count => count + 1)}
        renderLabel={tile => <span dir="ltr">{tile.id}</span>}
      />
      <span data-test="opened">{opened}</span>
      <span data-test="open-count">{openCount}</span>
      <span data-test="star-count">{starCount}</span>
      <span data-test="stars">{stars.join(',')}</span>
      <span data-test="cleared">{cleared}</span>
    </main>
  );
}
