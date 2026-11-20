import React from 'react';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {EmptyState} from '../../../../../../components/ui/patterns/molecules/EmptyState/EmptyState.jsx';

export function StorefrontSearchEmpty({countLabel, title, accent, body, retry, browse}) {
  return (
    <>
      <div role="status">
        <>{countLabel}</>
      </div>
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-4">
        <EmptyState icon="search-x" title={title} titleAccent={accent} body={body} />
        <div className="tw:flex tw:gap-3 tw:flex-wrap">
          <Button variant="primary" onClick={retry.onClick}>
            <>{retry.label}</>
          </Button>
          <Button variant="secondary" href={browse.href}>
            <>{browse.label}</>
          </Button>
        </div>
      </div>
    </>
  );
}
