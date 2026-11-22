import React from 'react';
import {Badge} from '../../../../../design-system/components/Badge/Badge.jsx';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {ProductDetails} from './ProductDetails';
import {StockStatus} from '../../../../../design-system/components/StockStatus/StockStatus.jsx';

export function StorefrontProductHeading({
  product,
  subtitle,
  badge,
  unitPriceLabel,
  stock,
  copyLabel,
  onCopyCode
}) {
  return (
    <ProductDetails
      product={product}
      titleId="vf-product-code"
      titleAction={
        <Button iconStart="copy" variant="ghost" onClick={onCopyCode}>
          <>{copyLabel}</>
        </Button>
      }
      subtitle={
        <div className="vf-product-category tw:flex tw:flex-wrap tw:gap-2 tw:items-center">
          <span className="vf-product-subtitle tw:text-sm tw:text-quiet">{subtitle}</span>
          <Badge tone="accent">
            <>{badge}</>
          </Badge>
        </div>
      }
      priceLabel={unitPriceLabel}
      stock={<StockStatus stock={stock} />}
    />
  );
}
