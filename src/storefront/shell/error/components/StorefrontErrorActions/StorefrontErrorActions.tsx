import React from 'react';
import type {ReactNode} from 'react';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';

type ErrorActionsProps = {
  retryLabel: ReactNode;
  onRetry: () => void;
  homeLabel: ReactNode;
  homeHref?: string;
  phoneLabel: ReactNode;
  phoneHref?: string;
};

export function StorefrontErrorActions({
  retryLabel,
  onRetry,
  homeLabel,
  homeHref,
  phoneLabel,
  phoneHref
}: ErrorActionsProps) {
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
