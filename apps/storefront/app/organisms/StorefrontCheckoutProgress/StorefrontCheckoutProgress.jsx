import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontCheckoutProgress({
  steps,
  current,
  onStepClick = undefined,
  labels,
  formatNumber,
  captionFormat
}) {
  return (
    <>
      <div className="tw:md:hidden">
        <DS.Stepper
          label={labels.region}
          steps={steps}
          current={current}
          onStepClick={onStepClick}
          doneLabel={labels.done}
          formatNumber={formatNumber}
          captionFormat={captionFormat}

          compact={true}
        />
      </div>
      <div className="tw:max-md:hidden">
        <DS.Stepper
          label={labels.region}
          steps={steps}
          current={current}
          onStepClick={onStepClick}
          doneLabel={labels.done}
          formatNumber={formatNumber}
          captionFormat={captionFormat}
        />
      </div>
    </>
  );
}
