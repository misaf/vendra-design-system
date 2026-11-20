import React from 'react';
import {Card} from '../../../../../../ui/components/Card/Card.jsx';
import {DetailList} from '../../../../../../ui/components/DetailList/DetailList.jsx';

export function StorefrontTrackOrderDetails({rows}) {
  return (
    <Card variant="sunken" padding={20}>
      <DetailList rows={rows} />
    </Card>
  );
}
