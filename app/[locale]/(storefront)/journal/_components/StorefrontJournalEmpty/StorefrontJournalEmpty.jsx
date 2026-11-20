import React from 'react';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {EmptyState} from '../../../../../../components/ui/patterns/molecules/EmptyState/EmptyState.jsx';

export function StorefrontJournalEmpty({title, clearLabel, onClear}) {
  return (
    <>
      <EmptyState title={title} headingLevel={2} />
      <Button onClick={onClear}>
        <>{clearLabel}</>
      </Button>
    </>
  );
}
