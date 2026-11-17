// StorefrontError: the page inside the storefront shell.
import React from 'react';
import * as DS from '../../app/ds.js';
import {StorefrontErrorLayout} from '../../app/layouts/StorefrontErrorLayout/StorefrontErrorLayout.jsx';
import {StorefrontErrorActions} from '../../app/organisms/StorefrontErrorActions/StorefrontErrorActions.jsx';
import {Shell} from '../../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontErrorLayout
          message={
            <DS.EmptyState
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
