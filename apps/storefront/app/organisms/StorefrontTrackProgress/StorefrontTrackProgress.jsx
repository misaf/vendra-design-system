import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontTrackProgress({steps, current, status, label, doneLabel}) {
  return (
    <DS.Card padding={24}>
      <DS.OrderTimeline
        steps={steps}
        current={current}
        status={status}
        label={label}
        doneLabel={doneLabel}
      />
    </DS.Card>
  );
}
