import React from 'react';
import type {ReactNode} from 'react';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';

type NotFoundActionsProps = {
  homeLabel: ReactNode;
  homeHref?: string;
  searchLabel: ReactNode;
  searchHref?: string;
};

export function StorefrontNotfoundActions({
  homeLabel,
  homeHref,
  searchLabel,
  searchHref
}: NotFoundActionsProps) {
  return (
    <>
      <Button variant="primary" iconStart="house" href={homeHref}>
        <>{homeLabel}</>
      </Button>
      <Button variant="secondary" iconStart="search" href={searchHref}>
        <>{searchLabel}</>
      </Button>
    </>
  );
}
