import React from 'react';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {ErrorSummary} from '../../../../../design-system/components/ErrorSummary/ErrorSummary.jsx';

export function StorefrontBagDeliveryIntro({errors, signin}) {
  return (
    <>
      <ErrorSummary id="vf-errors" errors={errors} data-vf-keep-focus />
      {signin.visible ? (
        <>
          <div className="vf-bag-signin tw:flex tw:items-center tw:justify-between tw:gap-3 tw:flex-wrap tw:py-3 tw:px-4 tw:rounded-md tw:bg-sunken tw:text-sm">
            <span>
              <>{signin.prompt}</>
            </span>
            <Button
              variant="secondary"
              size="sm"
              iconStart="user"
              href={signin.href}
              onClick={signin.onClick}
            >
              <>{signin.label}</>
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
}
