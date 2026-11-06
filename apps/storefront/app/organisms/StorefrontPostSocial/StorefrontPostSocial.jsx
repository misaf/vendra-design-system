import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPostSocial({
  whatsappLabel,
  whatsappHref,
  showInstagram,
  instagramLabel,
  instagramHref
}) {
  return (
    <div className="tw:flex tw:gap-3">
      <DS.Button variant="ghost" href={whatsappHref} target="_blank" rel="noopener noreferrer">
        {whatsappLabel}
      </DS.Button>
      {showInstagram ? (
        <DS.Button variant="ghost" href={instagramHref} target="_blank" rel="noopener noreferrer">
          {instagramLabel}
        </DS.Button>
      ) : null}
    </div>
  );
}
