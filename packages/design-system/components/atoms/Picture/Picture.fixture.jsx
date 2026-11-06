import React from 'react';
import {Picture} from './Picture.jsx';

// The spec answers every /photo/ request with a small PNG, holding the first one back to show the
// placeholder.
const photo = name => ({
  src: '/photo/' + name + '-960.jpg',
  srcSet: '/photo/' + name + '-480.jpg 480w, /photo/' + name + '-960.jpg 960w',
  sources: [
    {type: 'image/avif', srcSet: '/photo/' + name + '-480.avif 480w'},
    {type: 'image/webp', srcSet: '/photo/' + name + '-480.webp 480w'}
  ],
  width: 1200,
  height: 1500,
  placeholder:
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"%3E%3Crect width="4" height="5" fill="%23d9b8a8"/%3E%3C/svg%3E',
  alt: 'Ivory roses in a linen box'
});

export function Fixture() {
  const frame = {width: 200, aspectRatio: '4 / 5', display: 'block', objectFit: 'cover'};
  return (
    <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
      <Picture image={photo('held')} sizes="200px" priority className="held" style={frame} />
      <Picture image={photo('lazy')} sizes="200px" alt="" className="lazy" style={frame} />
      <Picture image="/photo/plain.png" className="plain" style={frame} />
      <Picture image={{src: ''}} className="empty" />
    </div>
  );
}
