import React from 'react';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {EmptyState} from '../../../../../design-system/components/EmptyState/EmptyState.jsx';

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
