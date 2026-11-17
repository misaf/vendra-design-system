import React from 'react';
import {StorefrontShopCategories} from './StorefrontShopCategories.jsx';
const copy = {
  en: {
    title: 'Shop categories',
    label: 'Categories',
    all: 'All flowers',
    bouquets: 'Bouquets',
    plants: 'Plants and seasonal gifts',
    none: 'No categories'
  },
  fa: {
    title: 'دسته‌های فروشگاه',
    label: 'دسته‌ها',
    all: 'همه گل‌ها',
    bouquets: 'دسته‌گل‌ها',
    plants: 'گیاهان و هدایای فصلی',
    none: 'بدون دسته'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [selected, setSelected] = React.useState('all');
  const [compact, setCompact] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [action, setAction] = React.useState('');
  return (
    <main className="tw:flex tw:flex-col tw:gap-3 tw:max-w-form">
      <h1>{t.title}</h1>
      <label>
        <input
          type="checkbox"
          checked={compact}
          onChange={event => setCompact(event.target.checked)}
        />{' '}
        Compact categories
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Empty categories
      </label>
      <StorefrontShopCategories
        compact={compact}
        label={t.label}
        categories={
          empty
            ? []
            : ['all', 'bouquets', 'plants'].map((id, index) => ({
                label: t[id],
                count: new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(
                  [12, 8, 0][index]
                ),
                on: selected === id,
                off: selected !== id,
                pick: () => {
                  setSelected(id);
                  setAction(id);
                }
              }))
        }
      />
      <span data-test="action">{action}</span>
    </main>
  );
}
