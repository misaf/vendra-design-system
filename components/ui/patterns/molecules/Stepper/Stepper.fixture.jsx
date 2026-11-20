import React from 'react';
import {Stepper} from './Stepper.jsx';

const STEPS = [{label: 'Bag'}, {label: 'Delivery'}, {label: 'Payment'}];

export function Fixture({lang}) {
  const [current, setCurrent] = React.useState(2);
  const persian = number => String(number).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);
  return (
    <div style={{display: 'grid', gap: 24}}>
      <Stepper
        label="Checkout"
        steps={STEPS}
        current={current}
        onStepClick={setCurrent}
        doneLabel="done"
        formatNumber={lang === 'fa' ? persian : undefined}
      />
      <Stepper label="Checkout, compact" steps={STEPS} current={1} compact />
      <output data-test="current">{current}</output>
    </div>
  );
}
