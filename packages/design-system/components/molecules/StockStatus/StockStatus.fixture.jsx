import React from 'react';
import {StockStatus} from './StockStatus.jsx';

export function Fixture() {
  return (
    <div style={{display: 'grid', gap: 8}}>
      <StockStatus stock={{status: 'in'}} />
      <StockStatus stock={{status: 'low', count: 2}} />
      <StockStatus stock={{status: 'soon', date: '2026-10-12'}} />
      <StockStatus stock={{status: 'soon', date: null}} />
      <StockStatus stock={{status: 'out'}} />
      <StockStatus stock={{status: 'in'}} hideInStock className="hidden-in-stock" />
    </div>
  );
}
