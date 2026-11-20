import React from 'react';
import {Card} from '../../../../../../components/ui/patterns/atoms/Card/Card.jsx';
import {OrderTimeline} from '../../../../../../components/ui/patterns/molecules/OrderTimeline/OrderTimeline.jsx';

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
