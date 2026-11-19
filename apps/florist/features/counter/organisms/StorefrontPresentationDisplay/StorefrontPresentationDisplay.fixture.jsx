import React from 'react';
import {StorefrontPresentationDisplay} from './StorefrontPresentationDisplay.jsx';

const copy = {
  en: {
    viewer: 'Quiet display',
    hint: 'Tap to reveal controls',
    photoUnavailable: 'Photo unavailable',
    soldOut: 'Sold out',
    empty: 'No designs',
    sellerTools: 'Seller tools',
    previous: 'Previous',
    next: 'Next'
  },
  fa: {
    viewer: 'نمایش آرام',
    hint: 'برای نمایش کنترل‌ها لمس کنید',
    photoUnavailable: 'عکس موجود نیست',
    soldOut: 'تمام شده',
    empty: 'طرحی نیست',
    sellerTools: 'ابزار فروشنده',
    previous: 'قبلی',
    next: 'بعدی'
  }
};

export function Fixture({lang}) {
  const [variant, setVariant] = React.useState('single');
  const [caption, setCaption] = React.useState('price');
  const [prices, setPrices] = React.useState(true);
  const [mode, setMode] = React.useState('tablet');
  const [mounted, setMounted] = React.useState(true);
  const [version, setVersion] = React.useState(0);
  const [events, setEvents] = React.useState([]);
  const record = value => setEvents(current => [...current, value]);
  const image = {
    src: '/assets/categories/bouquets.webp',
    srcSet: '/assets/categories/bouquets.webp 640w',
    alt: 'VF-7K2M4Q'
  };
  const first = {
    id: 'first',
    code: 'VF-7K2M4Q',
    imageKey: 'first-photo',
    image,
    price: '2,000,000',
    unavailableImage: variant === 'fallback'
  };
  const second = {
    id: 'second',
    code: 'VF-8P3N5R',
    imageKey: 'second-photo',
    image: {...image, alt: 'VF-8P3N5R'},
    price: '3,000,000',
    soldOut: true
  };
  return (
    <>
      <label>
        Variant
        <select value={variant} onChange={event => setVariant(event.target.value)}>
          {['single', 'pair', 'fallback', 'empty'].map(value => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        Caption
        <select value={caption} onChange={event => setCaption(event.target.value)}>
          {['price', 'code', 'photo'].map(value => (
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
      <label>
        Mode
        <select value={mode} onChange={event => setMode(event.target.value)}>
          <option>tablet</option>
          <option>tv</option>
        </select>
      </label>
      <button type="button" onClick={() => setMounted(value => !value)}>
        Toggle display
      </button>
      <button type="button" onClick={() => setVersion(value => value + 1)}>
        Replace preload
      </button>
      <button type="button" onClick={() => setEvents([])}>
        Reset events
      </button>
      <span data-test="events" style={{overflowWrap: 'anywhere'}}>
        {JSON.stringify(events)}
      </span>
      <main className="vf-presentation">
        {mounted ? (
          <StorefrontPresentationDisplay
            mode={mode}
            direction={lang === 'fa' ? 'rtl' : 'ltr'}
            products={variant === 'empty' ? [] : variant === 'pair' ? [first, second] : [first]}
            hasCurrentProduct={variant !== 'empty'}
            preloadProducts={[{imageKey: 'preload-photo', image}]}
            preloadVersion={version}
            captionMode={caption}
            showPrices={prices}
            labels={copy[lang]}
            onLoaded={key => record('loaded:' + key)}
            onFailed={key => record('failed:' + key)}
            onNext={() => record('next')}
            onPrevious={() => record('previous')}
            onOpenTools={() => record('tools')}
          />
        ) : null}
      </main>
    </>
  );
}
