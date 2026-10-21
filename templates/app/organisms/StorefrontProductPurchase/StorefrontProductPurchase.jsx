import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontProductPurchase({summary, quantity, save, add}) {
  return (
    <>
      <div className="vf-product-selection-summary tw:flex tw:flex-col tw:gap-1">
        <div
          className="vf-product-selection-total tw:max-md:hidden tw:flex tw:flex-wrap tw:items-baseline tw:justify-between tw:gap-2"
          role="status"
          aria-atomic="true"
        >
          <span className="tw:text-sm tw:font-medium">{summary.label}</span>
          <DS.Price value={summary.total} />
        </div>
        <p className="vf-product-total-hint tw:m-0 tw:text-sm tw:text-quiet">{summary.hint}</p>
      </div>
      <div className="tw:flex tw:gap-3 tw:items-center tw:flex-wrap">
        <DS.QuantityInput
          value={quantity.value}
          min={1}
          max={quantity.max}
          onChange={quantity.onChange}
          labels={quantity.labels}
        />
        <DS.IconButton
          icon="heart"
          label={save.label}
          variant="secondary"
          size="lg"
          active={save.active}
          onClick={save.onClick}
          className="vf-product-save"
        />
        <div className="vf-product-add-button tw:max-md:hidden tw:min-w-0 vf-product-add tw:[flex:1_1_260px]">
          <DS.Button
            variant="primary"
            size="lg"
            block={true}
            iconStart="shopping-bag"
            onClick={add.onClick}
            disabled={add.disabled}
          >
            <>{add.label}</>
          </DS.Button>
        </div>
      </div>
    </>
  );
}
