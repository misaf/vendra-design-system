import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontProductHeading({
  productCode,
  subtitle,
  badge,
  unitPriceLabel,
  unitPrice,
  stock,
  description,
  copyLabel,
  onCopyCode
}) {
  return (
    <div className="vf-product-heading tw:flex tw:flex-col tw:gap-2">
      <div className="vf-product-title tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2">
        <h1 id="vf-product-code">
          <>{productCode}</>
        </h1>
        <DS.Button iconStart="copy" variant="ghost" onClick={onCopyCode}>
          <>{copyLabel}</>
        </DS.Button>
      </div>
      <div className="vf-product-category tw:flex tw:flex-wrap tw:gap-2 tw:items-center">
        <span className="vf-product-subtitle tw:text-sm tw:text-quiet">
          <>{subtitle}</>
        </span>
        <DS.Badge tone="accent">
          <>{badge}</>
        </DS.Badge>
      </div>
      <div className="vf-product-price-stock tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2">
        <div className="tw:flex tw:flex-col tw:gap-1">
          <span className="vf-product-unit-label tw:text-sm tw:text-quiet">{unitPriceLabel}</span>
          <DS.Price value={unitPrice} size="lg" className="vf-product-price" />
        </div>
        <DS.StockStatus stock={stock} />
      </div>
      <p className="vf-product-description tw:text-secondary tw:m-0 tw:max-w-[52ch] tw:text-base tw:leading-body tw:text-pretty">
        <>{description}</>
      </p>
    </div>
  );
}
