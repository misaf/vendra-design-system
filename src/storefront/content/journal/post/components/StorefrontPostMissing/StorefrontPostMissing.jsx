import React from 'react';
import {Button} from '../../../../../../design-system/components/Button/Button.jsx';
import {EmptyState} from '../../../../../../design-system/components/EmptyState/EmptyState.jsx';

export function StorefrontPostMissing({title, backLabel, journalHref}) {
  return (
    <>
      <EmptyState title={title} headingLevel={1} />
      <Button href={journalHref}>
        <>{backLabel}</>
      </Button>
    </>
  );
}
