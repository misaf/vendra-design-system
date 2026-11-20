import React from 'react';
import {Button} from '../../../../../../../components/ui/components/Button/Button.jsx';
import {EmptyState} from '../../../../../../../components/ui/patterns/molecules/EmptyState/EmptyState.jsx';

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
