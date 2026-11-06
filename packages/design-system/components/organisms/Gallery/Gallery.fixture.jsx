import React from 'react';
import {Gallery} from './Gallery.jsx';

export function Fixture() {
  return (
    <div style={{width: 320}}>
      <Gallery
        label="Product photos"
        slideLabel={(index, count) => index + ' of ' + count}
        images={[1, 2, 3].map(number => ({src: '/assets/placeholder.svg', alt: 'Photo ' + number}))}
      />
    </div>
  );
}
