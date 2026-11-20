import React from 'react';
import {Stepper} from '../../../../design-system/components/Stepper/Stepper.jsx';

export function StorefrontStepProgress({
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
        <Stepper
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
        <Stepper
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
