import React from 'react';
import {StorefrontProductHeading} from './StorefrontProductHeading.jsx';

const copy = {
  en: {
    subtitle: 'Bouquets',
    badge: 'Ready today',
    unitPriceLabel: 'Unit price',
    description: 'A seasonal arrangement prepared by the studio.',
    copyLabel: 'Copy design code',
    updated: 'A second supplied description.'
  },
  fa: {
    subtitle: 'دسته‌گل‌ها',
    badge: 'آماده امروز',
    unitPriceLabel: 'قیمت واحد',
    description: 'چیدمان فصلی آماده‌شده در استودیو.',
    copyLabel: 'کپی کد طرح',
    updated: 'توضیح دوم ارائه‌شده.'
  }
};
export function Fixture({lang}) {
  const [status, setStatus] = React.useState('in');
  const [updated, setUpdated] = React.useState(false);
  const [copies, setCopies] = React.useState(0);
  const t = copy[lang];
  return (
    <>
      <label>
        Stock
        <select value={status} onChange={event => setStatus(event.target.value)}>
          {['in', 'low', 'soon', 'out'].map(value => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <button type="button" onClick={() => setUpdated(value => !value)}>
        Update content
      </button>
      <span data-test="copies">{copies}</span>
      <main>
        <StorefrontProductHeading
          subtitle={t.subtitle}
          badge={t.badge}
          unitPriceLabel={t.unitPriceLabel}
          copyLabel={t.copyLabel}
          product={{
            name: updated ? 'VF-8P3N5R' : 'VF-7K2M4Q',
            price: updated ? '3,000,000' : '2,000,000',
            description: {locale: lang, paragraphs: [updated ? t.updated : t.description]}
          }}
          stock={{status, count: 2, date: '2026-10-12'}}
          onCopyCode={() => setCopies(value => value + 1)}
        />
      </main>
    </>
  );
}
