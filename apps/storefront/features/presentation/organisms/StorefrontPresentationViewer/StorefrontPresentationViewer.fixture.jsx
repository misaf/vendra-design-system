import React from 'react';
import {StorefrontPresentationViewer} from './StorefrontPresentationViewer.jsx';

const copy = {
  en: {
    open: 'Open viewer',
    slideshow: 'Open slideshow viewer',
    noPrices: 'Open without prices',
    viewer: 'Design viewer',
    size: 'Size',
    extras: 'Extras',
    options: 'Design options',
    added: 'Added to order',
    addOrder: 'Add to order',
    send: 'Send design',
    star: 'Shortlist design',
    standard: 'Standard',
    large: 'Large',
    card: 'Gift card'
  },
  fa: {
    open: 'باز کردن نمایشگر',
    slideshow: 'باز کردن نمایش اسلاید',
    noPrices: 'نمایش بدون قیمت',
    viewer: 'نمایشگر طرح',
    size: 'اندازه',
    extras: 'افزودنی‌ها',
    options: 'گزینه‌های طرح',
    added: 'به سفارش اضافه شد',
    addOrder: 'افزودن به سفارش',
    send: 'ارسال طرح',
    star: 'انتخاب طرح',
    standard: 'معمولی',
    large: 'بزرگ',
    card: 'کارت هدیه'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [index, setIndex] = React.useState(null);
  const [options, setOptions] = React.useState(false);
  const [size, setSize] = React.useState('standard');
  const [card, setCard] = React.useState(false);
  const [stars, setStars] = React.useState([]);
  const [added, setAdded] = React.useState(false);
  const [sent, setSent] = React.useState('');
  const [mode, setMode] = React.useState('normal');
  const open = mode => {
    setMode(mode);
    setOptions(mode === 'slideshow');
    setIndex(0);
  };
  const items = ['VF-7K2M4Q', 'VF-3P8R1T'].map((id, i) => ({
    id,
    images: [{src: '/assets/placeholder.svg', alt: id}],
    price: '2,000,000',
    quote: size === 'large' ? '3,100,000' : '2,400,000',
    soldOut: i === 1,
    sizes: ['standard', 'large'].map(value => ({
      id: value,
      label: t[value],
      selected: size === value,
      pick: () => setSize(value)
    })),
    addons: [{id: 'card', label: t.card, selected: card, pick: () => setCard(current => !current)}],
    starLabel: t.star,
    starred: stars.includes(id),
    star: () =>
      setStars(current =>
        current.includes(id) ? current.filter(value => value !== id) : [...current, id]
      ),
    added,
    addToOrder: () => setAdded(true),
    sendIt: () => setSent(id)
  }));
  return (
    <>
      <button type="button" onClick={() => open('normal')}>
        {t.open}
      </button>
      <button type="button" onClick={() => open('slideshow')}>
        {t.slideshow}
      </button>
      <button type="button" onClick={() => open('no-prices')}>
        {t.noPrices}
      </button>
      <span data-test="index">{index}</span>
      <span data-test="stars">{stars.join(',')}</span>
      <span data-test="sent">{sent}</span>
      <StorefrontPresentationViewer
        items={items}
        index={index}
        calm={mode === 'slideshow'}
        showPrices={mode !== 'no-prices'}
        optionsOpen={options}
        slideshowRunning={mode === 'slideshow'}
        labels={t}
        renderLabel={item => <span dir="ltr">{item.id}</span>}
        onIndexChange={setIndex}
        onClose={() => setIndex(null)}
        onToggleOptions={() => setOptions(current => !current)}
      />
    </>
  );
}
