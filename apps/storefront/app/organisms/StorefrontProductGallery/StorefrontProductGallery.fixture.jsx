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
  const [galleryIndex, setGalleryIndex] = React.useState(0);
  const [index, setIndex] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const record = value => setEvents(current => [...current, value]);
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
      <button
        type="button"
        onClick={() => {
          setProductCode('VF-8P3N5R');
          setGalleryIndex(0);
        }}
      >
        Change product
      </button>
      <span data-test="events" style={{overflowWrap: 'anywhere'}}>
        {JSON.stringify(events)}
      </span>
      <span data-test="gallery-index">{galleryIndex}</span>
      <main style={{maxWidth: 480}}>
        <StorefrontProductGallery
          productCode={productCode}
          images={images}
          items={images.map((image, index) => ({
            images: [image],
            caption: productCode + ' ' + (index + 1)
          }))}
          index={index}
          labels={copy[lang]}
          onGalleryIndexChange={value => {
            record('gallery:' + value);
            setGalleryIndex(value);
          }}
          onOpen={() => {
            record('open');
            setIndex(galleryIndex);
          }}
          onIndexChange={value => {
            record('viewer:' + value);
            setIndex(value);
          }}
          onClose={() => {
            record('close');
            setIndex(null);
          }}
        />
      </main>
    </>
  );
}
