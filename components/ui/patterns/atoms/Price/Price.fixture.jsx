import React from 'react';
import {Price} from './Price.jsx';

export function Fixture() {
  return (
    <div>
      <Price value="490,000 Toman" compareAt="560,000 Toman" className="reduced" />
      <Price value="2,400,000 Toman" size="lg" className="plain" />
    </div>
  );
}
