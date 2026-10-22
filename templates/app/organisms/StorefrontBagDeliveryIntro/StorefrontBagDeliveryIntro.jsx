import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontBagDeliveryIntro({errors, signin}) {
  return (
    <>
      <DS.ErrorSummary id="vf-errors" errors={errors} />
      {signin.visible ? (
        <>
          <div className="vf-bag-signin tw:flex tw:items-center tw:justify-between tw:gap-3 tw:flex-wrap tw:py-3 tw:px-4 tw:rounded-md tw:bg-sunken tw:text-sm">
            <span>
              <>{signin.prompt}</>
            </span>
            <DS.Button
              variant="secondary"
              size="sm"
              iconStart="user"
              href={signin.href}
              onClick={signin.onClick}
            >
              <>{signin.label}</>
            </DS.Button>
          </div>
        </>
      ) : null}
    </>
  );
}
