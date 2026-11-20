import React from 'react';
import {Button} from '../../../../../../../ui/components/Button/Button.jsx';
import {EmptyState} from '../../../../../../../ui/components/EmptyState/EmptyState.jsx';

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
