import React from 'react';
import {StorefrontPresentationShortlist} from './StorefrontPresentationShortlist.jsx';

const copy = {
  en: {
    title: 'Compare designs',
    clear: 'Clear shortlist',
    sendShortlist: 'Send shortlist',
    show: 'Show design',
    remove: 'Remove design',
    empty: 'No shortlisted designs',
    soldOut: 'Sold out'
  },
  fa: {
    title: 'مقایسه طرح‌ها',
    clear: 'پاک کردن انتخاب‌ها',
    sendShortlist: 'ارسال انتخاب‌ها',
    show: 'نمایش طرح',
    remove: 'حذف طرح',
    empty: 'طرح انتخاب‌شده‌ای نیست',
    soldOut: 'تمام شده'
  }
};
export function Fixture({lang}) {
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState('two');
  const [prices, setPrices] = React.useState(true);
  const [events, setEvents] = React.useState([]);
  const record = value => setEvents(current => [...current, value]);
  const t = copy[lang];
  const codes =
    count === 'empty' ? [] : count === 'one' ? ['VF-8P3N5R'] : ['VF-7K2M4Q', 'VF-8P3N5R'];
  const items = codes.map(code => ({
    id: code,
    code,
    soldOut: code === 'VF-8P3N5R',
    price: code === 'VF-8P3N5R' ? '3,000,000' : '2,000,000',
    image: {
      src: '/assets/categories/bouquets.webp',
      srcSet: '/assets/categories/bouquets.webp 640w',
      alt: code
    },
    show: () => record('show:' + code),
    remove: () => record('remove:' + code)
  }));
  return (
    <>
      <label>
        Items
        <select value={count} onChange={event => setCount(event.target.value)}>
          {['two', 'one', 'empty'].map(value => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={prices}
          onChange={event => setPrices(event.target.checked)}
        />
        Prices
      </label>
      <button type="button" onClick={() => setOpen(true)}>
        Open shortlist
      </button>
      <span data-test="events" style={{overflowWrap: 'anywhere'}}>
        {JSON.stringify(events)}
      </span>
      <StorefrontPresentationShortlist
        open={open}
        items={items}
        showPrices={prices}
        labels={t}
        renderLabel={item => (
          <span data-test="label">
            <bdi dir="ltr">{item.code}</bdi>
            {item.soldOut ? <span>{t.soldOut}</span> : null}
          </span>
        )}
        onClose={() => {
          record('close');
          setOpen(false);
        }}
        onClear={() => record('clear')}
        onSend={() => record('send')}
      />
    </>
  );
}
