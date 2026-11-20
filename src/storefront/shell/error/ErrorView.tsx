// StorefrontError: the page inside the storefront shell.
import React from 'react';
import {EmptyState} from '../../../design-system/components/EmptyState/EmptyState.jsx';
import {StorefrontErrorLayout} from './components/StorefrontErrorLayout/StorefrontErrorLayout';
import {StorefrontErrorActions} from './components/StorefrontErrorActions/StorefrontErrorActions';
import {Shell} from '../components/Shell.jsx';

import type {useError} from './useError.js';

export function View({v}: {v: ReturnType<typeof useError>}) {
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
