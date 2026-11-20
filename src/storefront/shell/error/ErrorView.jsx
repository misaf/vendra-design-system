// StorefrontError: the page inside the storefront shell.
import React from 'react';
import {EmptyState} from '../../../design-system/components/EmptyState/EmptyState.jsx';
import {StorefrontErrorLayout} from './_components/StorefrontErrorLayout/StorefrontErrorLayout.jsx';
import {StorefrontErrorActions} from './_components/StorefrontErrorActions/StorefrontErrorActions.jsx';
import {Shell} from '../components/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontErrorLayout
          message={
            <EmptyState
              icon="flower-2"
              eyebrow={v.t?.code}
              title={v.t?.hA}
              titleAccent={v.t?.hB}
              body={v.t?.hP}
              headingLevel={1}
            />
          }
          actions={
            <StorefrontErrorActions
              retryLabel={v.t?.retry}
              onRetry={v.retry}
              homeLabel={v.t?.home}
              homeHref={v.href?.home}
              phoneLabel={v.t?.call}
              phoneHref={v.phoneHref}
            />
          }
        />
      }
      sticky={<></>}
    />
  );
}
