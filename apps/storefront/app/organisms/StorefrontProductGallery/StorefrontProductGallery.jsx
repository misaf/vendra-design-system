import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontProductGallery({
  productCode,
  images,
  items,
  index,
  labels,
  onGalleryIndexChange,
  onOpen,
  onIndexChange,
  onClose
}) {
  return (
    <>
      <DS.Gallery
        key={productCode}
        images={images}
        onIndexChange={onGalleryIndexChange}
        aspect="4/5"
        label={labels.photos}
        slideLabel={labels.slide}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
      <div>
        <DS.Button variant="secondary" size="sm" iconStart="image" onClick={onOpen}>
          <>{labels.fullScreen}</>
        </DS.Button>
      </div>
      <DS.Lightbox
        label={labels.photos}
        items={items}
        index={index}
        onIndexChange={onIndexChange}
        onClose={onClose}
      />
    </>
  );
}
