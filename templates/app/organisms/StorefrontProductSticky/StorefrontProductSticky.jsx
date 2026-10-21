import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontProductSticky({summary, add}) {
  return (
    <div className="vf-product-mobile-action tw:relative tw:flex tw:flex-wrap tw:gap-3 tw:items-center tw:bg-card tw:[border-top:1px_solid_var(--border-subtle)] tw:py-2 tw:px-4">
      <div
        className="vf-product-mobile-total tw:flex-1 tw:flex tw:flex-col tw:gap-1"
        role="status"
        aria-atomic="true"
      >
        <span className="vf-product-total-label tw:text-xs tw:text-quiet">{summary.label}</span>
        <DS.Price value={summary.total} size="sm" />
      </div>
      <DS.Button
        variant="primary"
        iconStart="shopping-bag"
        onClick={add.onClick}
        disabled={add.disabled}
      >
        <>{add.label}</>
      </DS.Button>
    </div>
  );
}
