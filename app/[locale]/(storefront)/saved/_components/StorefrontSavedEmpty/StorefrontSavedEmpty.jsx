import React from 'react';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {EmptyState} from '../../../../../../components/ui/patterns/molecules/EmptyState/EmptyState.jsx';

export function StorefrontSavedEmpty({title, accent, body, browse}) {
  return (
    <>
      <EmptyState icon="heart" title={title} titleAccent={accent} body={body} />
      <Button variant="primary" href={browse.href}>
        <>{browse.label}</>
      </Button>
    </>
  );
}
