// StorefrontError: the page inside the storefront shell.
import React from 'react';
import {StorefrontErrorLayout} from '../../app/layouts/StorefrontErrorLayout/StorefrontErrorLayout.jsx';
import {StorefrontErrorMessage} from '../../app/organisms/StorefrontErrorMessage/StorefrontErrorMessage.jsx';
import {StorefrontErrorActions} from '../../app/organisms/StorefrontErrorActions/StorefrontErrorActions.jsx';
import {Shell} from '../../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontErrorLayout
          message={
            <StorefrontErrorMessage
              eyebrow={v.t?.code}
              title={v.t?.hA}
              accent={v.t?.hB}
              body={v.t?.hP}
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
