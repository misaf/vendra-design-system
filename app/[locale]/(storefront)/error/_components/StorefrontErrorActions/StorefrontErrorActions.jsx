import React from 'react';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';

export function StorefrontErrorActions({
  retryLabel,
  onRetry,
  homeLabel,
  homeHref,
  phoneLabel,
  phoneHref
}) {
  return (
    <>
      <Button variant="primary" iconStart="rotate-ccw" onClick={onRetry}>
        <>{retryLabel}</>
      </Button>
      <Button variant="secondary" iconStart="house" href={homeHref}>
        <>{homeLabel}</>
      </Button>
      <Button variant="ghost" iconStart="phone" href={phoneHref}>
        <>{phoneLabel}</>
      </Button>
    </>
  );
}
