import React from 'react';
import {Card} from '../../../../../design-system/components/Card/Card.jsx';
import {OrderTimeline} from '../../../../../design-system/components/OrderTimeline/OrderTimeline.jsx';

export function StorefrontTrackProgress({steps, current, status, label, doneLabel}) {
  return (
    <Card padding={24}>
      <OrderTimeline
        steps={steps}
        current={current}
        status={status}
        label={label}
        doneLabel={doneLabel}
      />
    </Card>
  );
}
