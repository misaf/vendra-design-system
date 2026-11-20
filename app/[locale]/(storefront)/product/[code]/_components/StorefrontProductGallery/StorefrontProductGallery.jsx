import React from 'react';
import {Button} from '../../../../../../../ui/components/Button/Button.jsx';
import {Gallery} from '../../../../../../../ui/components/Gallery/Gallery.jsx';
import {Lightbox} from '../../../../../../../ui/components/Lightbox/Lightbox.jsx';

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
      <Gallery
        key={productCode}
        images={images}
        onIndexChange={onGalleryIndexChange}
        aspect="4/5"
        label={labels.photos}
        slideLabel={labels.slide}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
      <div>
        <Button variant="secondary" size="sm" iconStart="image" onClick={onOpen}>
          <>{labels.fullScreen}</>
        </Button>
      </div>
      <Lightbox
        label={labels.photos}
        items={items}
        index={index}
        onIndexChange={onIndexChange}
        onClose={onClose}
      />
    </>
  );
}
