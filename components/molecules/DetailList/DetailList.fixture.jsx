import React from 'react';
import {DetailList} from './DetailList.jsx';

export function Fixture() {
  return (
    <div style={{maxWidth: 420}}>
      <DetailList
        rows={[
          {label: 'Order', value: 'VN-10522'},
          null,
          {icon: 'truck', label: 'Delivery', value: 'Tomorrow, 09:00–12:00'},
          false,
          {label: 'Total', value: '4,600,000 Toman'}
        ]}
      />
    </div>
  );
}
