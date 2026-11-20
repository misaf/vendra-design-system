import React from 'react';
import {Card} from '../../../../../../components/ui/patterns/atoms/Card/Card.jsx';
import {DetailList} from '../../../../../../components/ui/patterns/molecules/DetailList/DetailList.jsx';

export function StorefrontTrackOrderDetails({rows}) {
  return (
    <Card variant="sunken" padding={20}>
      <DetailList rows={rows} />
    </Card>
  );
}
