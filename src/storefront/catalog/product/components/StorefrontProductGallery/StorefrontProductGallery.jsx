import React from 'react';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {Gallery} from '../../../../../design-system/components/Gallery/Gallery.jsx';
import {Lightbox} from '../../../../../design-system/components/Lightbox/Lightbox.jsx';

export function StorefrontProductGallery({images, labels}) {
  const galleryIndex = React.useRef(0);
  const [viewerIndex, setViewerIndex] = React.useState(null);
  return (
    <>
      <Gallery
        images={images}
        onIndexChange={index => {
          galleryIndex.current = index;
        }}
        aspect="4/5"
        label={labels.photos}
        slideLabel={labels.slide}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
      <div>
        <Button
          variant="secondary"
          size="sm"
          iconStart="image"
          onClick={() => setViewerIndex(Math.min(galleryIndex.current, images.length - 1))}
        >
          <>{labels.fullScreen}</>
        </Button>
      </div>
      <Lightbox
        label={labels.photos}
        items={images.map(image => ({images: [image]}))}
        index={viewerIndex}
        onIndexChange={setViewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </>
  );
}
