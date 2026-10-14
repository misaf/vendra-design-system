// StorefrontError: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main id="main" tabIndex={-1} className="vf-shopping tw:mx-auto">
            <div className="vf-error-message tw:mx-auto tw:flex tw:flex-col tw:items-center tw:max-w-[600px] tw:gap-4h">
              <DS.EmptyState
                icon="flower-2"
                eyebrow={v.t?.code}
                title={v.t?.hA}
                titleAccent={v.t?.hB}
                body={v.t?.hP}
                headingLevel={1}
              />
              <div className="tw:flex tw:gap-3 tw:flex-wrap tw:justify-center">
                <DS.Button variant="primary" iconStart="rotate-ccw" onClick={v.retry}>
                  <>{v.t?.retry}</>
                </DS.Button>
                <DS.Button variant="secondary" iconStart="house" href={v.href?.home}>
                  <>{v.t?.home}</>
                </DS.Button>
                <DS.Button variant="ghost" iconStart="phone" href={v.phoneHref}>
                  <>{v.t?.call}</>
                </DS.Button>
              </div>
            </div>
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
