import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontWeddingsServices({services}) {
  return (
    <>
      {services.map((s, $index) => (
        <React.Fragment key={$index}>
          <DS.Card padding={24}>
            <div className="tw:flex tw:flex-col tw:gap-3">
              <div className="vf-weddings-service-icon tw:grid tw:w-tap tw:h-tap tw:rounded-pill tw:bg-accent-soft tw:text-on-soft tw:place-items-center">
                <DS.Icon name={s?.icon} size={20} />
              </div>
              <div className="vf-weddings-service-title tw:text-md tw:font-medium">
                <>{s?.title}</>
              </div>
              <div className="vf-weddings-service-description tw:text-base tw:leading-body tw:text-quiet">
                <>{s?.body}</>
              </div>
              <div className="vf-weddings-service-price tw:text-sm tw:font-medium tw:text-accent">
                <>{s?.price}</>
              </div>
            </div>
          </DS.Card>
        </React.Fragment>
      ))}
    </>
  );
}
