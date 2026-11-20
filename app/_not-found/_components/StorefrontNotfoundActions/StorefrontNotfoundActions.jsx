import React from 'react';
import {Button} from '../../../../ui/components/Button/Button.jsx';

export function StorefrontNotfoundActions({homeLabel, homeHref, searchLabel, searchHref}) {
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
