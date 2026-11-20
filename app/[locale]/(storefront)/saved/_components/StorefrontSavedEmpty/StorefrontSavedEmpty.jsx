import React from 'react';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';
import {EmptyState} from '../../../../../../ui/components/EmptyState/EmptyState.jsx';

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
