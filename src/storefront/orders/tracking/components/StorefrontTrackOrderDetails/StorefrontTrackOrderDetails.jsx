import React from 'react';
import {Card} from '../../../../../design-system/components/Card/Card.jsx';
import {DetailList} from '../../../../../design-system/components/DetailList/DetailList.jsx';

export function StorefrontTrackOrderDetails({rows}) {
  return (
    <Card variant="sunken" padding={20}>
      <DetailList rows={rows} />
    </Card>
  );
}
