import React from 'react';
import {StorefrontProductGallery} from './StorefrontProductGallery.jsx';

const copy = {
  en: {
    photos: 'Design photos',
    fullScreen: 'View fullscreen',
    slide: (index, total) => `Photo ${index} of ${total}`
  },
  fa: {
    photos: 'عکس‌های طرح',
    fullScreen: 'نمایش تمام‌صفحه',
    slide: (index, total) => `عکس ${index} از ${total}`
  }
};
export function Fixture({lang}) {
  const [productCode, setProductCode] = React.useState('VF-7K2M4Q');
  const [single, setSingle] = React.useState(false);
  const images = ['/assets/categories/bouquets.webp', '/assets/categories/boxes.webp']
    .slice(0, single ? 1 : 2)
    .map((src, index) => ({src, srcSet: src + ' 640w', alt: productCode + ' ' + (index + 1)}));
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={single}
          onChange={event => setSingle(event.target.checked)}
        />
        Single photo
      </label>
      <button type="button" onClick={() => setProductCode('VF-8P3N5R')}>
        Change product
      </button>
      <main style={{maxWidth: 480}}>
        <StorefrontProductGallery key={productCode} images={images} labels={copy[lang]} />
      </main>
    </>
  );
}
