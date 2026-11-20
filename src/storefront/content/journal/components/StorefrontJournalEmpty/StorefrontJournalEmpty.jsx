import React from 'react';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {EmptyState} from '../../../../../design-system/components/EmptyState/EmptyState.jsx';

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
