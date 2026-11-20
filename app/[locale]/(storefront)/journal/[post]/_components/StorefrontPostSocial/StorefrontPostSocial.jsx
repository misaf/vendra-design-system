import React from 'react';
import {Button} from '../../../../../../../ui/components/Button/Button.jsx';

export function StorefrontPostSocial({
  whatsappLabel,
  whatsappHref,
  showInstagram,
  instagramLabel,
  instagramHref
}) {
  return (
    <div className="tw:flex tw:gap-3">
      <Button variant="ghost" href={whatsappHref} target="_blank" rel="noopener noreferrer">
        {whatsappLabel}
      </Button>
      {showInstagram ? (
        <Button variant="ghost" href={instagramHref} target="_blank" rel="noopener noreferrer">
          {instagramLabel}
        </Button>
      ) : null}
    </div>
  );
}
