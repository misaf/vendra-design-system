import React from 'react';

export function StorefrontWeddingsStory({galleryTitle, gallery, processTitle, process}) {
  return (
    <>
      <h2>
        <>{galleryTitle}</>
      </h2>
      <div className="tw:grid tw:grid-cols-3 tw:gap-4">
        {gallery.map((photo, $index) => (
          <React.Fragment key={$index}>
            <img
              src={photo?.src}
              alt={photo?.alt}
              loading="lazy"
              className="tw:w-full tw:rounded-md"
            />
          </React.Fragment>
        ))}
      </div>
      <h2 className="tw:mt-7">
        <>{processTitle}</>
      </h2>
      <ol className="tw:grid tw:gap-5 tw:md:grid-cols-3">
        {process.map((step, $index) => (
          <React.Fragment key={$index}>
            <li>
              <>{step}</>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </>
  );
}
