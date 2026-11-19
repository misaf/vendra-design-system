import React from 'react';
import {OrderTimeline} from './OrderTimeline.jsx';

const STEPS = [
  {label: 'Placed', time: '09:12'},
  {label: 'Arranging', time: '10:40'},
  {label: 'On the way'},
  {label: 'Delivered'}
];

export function Fixture() {
  return (
    <div style={{display: 'grid', gap: 24}}>
      <OrderTimeline label="Order progress" steps={STEPS} current={2} />
      <OrderTimeline label="Finished order" steps={STEPS} status="done" />
      <OrderTimeline label="Cancelled order" steps={STEPS} status="cancelled" />
    </div>
  );
}
