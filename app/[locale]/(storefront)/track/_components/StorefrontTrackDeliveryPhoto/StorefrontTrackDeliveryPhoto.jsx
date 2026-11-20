import React from 'react';
import {ArchFrame} from '../../../../../../ui/components/ArchFrame/ArchFrame.jsx';

export function StorefrontTrackDeliveryPhoto({src, placeholderLabel, alt, caption}) {
  return (
    <figure className="vf-track-photo tw:m-0 tw:flex tw:flex-col tw:gap-3">
      <div className="vf-track-photo-frame tw:max-w-media">
        <ArchFrame
          src={src}
          ratio="4/5"
          shape="soft"
          tone="product"
          placeholderLabel={placeholderLabel}
          alt={alt}
        />
      </div>
      <figcaption className="vf-track-photo-caption tw:text-sm tw:text-quiet">
        <>{caption}</>
      </figcaption>
    </figure>
  );
}
