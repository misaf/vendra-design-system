// StorefrontError: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {StorefrontErrorLayout} from '../app/layouts/StorefrontErrorLayout/StorefrontErrorLayout.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontErrorLayout
            message={
              <>
                <DS.EmptyState
                  icon="flower-2"
                  eyebrow={v.t?.code}
                  title={v.t?.hA}
                  titleAccent={v.t?.hB}
                  body={v.t?.hP}
                  headingLevel={1}
                />
              </>
            }
            actions={
              <>
                <DS.Button variant="primary" iconStart="rotate-ccw" onClick={v.retry}>
                  <>{v.t?.retry}</>
                </DS.Button>
                <DS.Button variant="secondary" iconStart="house" href={v.href?.home}>
                  <>{v.t?.home}</>
                </DS.Button>
                <DS.Button variant="ghost" iconStart="phone" href={v.phoneHref}>
                  <>{v.t?.call}</>
                </DS.Button>
              </>
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
