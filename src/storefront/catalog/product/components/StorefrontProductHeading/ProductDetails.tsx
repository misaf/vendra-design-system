import React, {type ReactNode} from 'react';
import {Price} from '../../../../../design-system/components/Price/Price.jsx';

export type ProductLocale = 'en' | 'fa';

export interface ProductDetailsData {
  name: string;
  price: string;
  description: {locale?: ProductLocale; paragraphs: string[]} | null;
}

export function ProductDetails({
  product,
  titleId,
  titleAction,
  subtitle,
  priceLabel,
  stock
}: {
  product: ProductDetailsData;
  titleId?: string;
  titleAction?: ReactNode;
  subtitle?: ReactNode;
  priceLabel?: string;
  stock?: ReactNode;
}) {
  const {name, price, description} = product;
  return (
    <div className="vf-product-heading tw:flex tw:flex-col tw:gap-2">
      <div className="vf-product-title tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2">
        <h1 id={titleId}>{name}</h1>
        {titleAction}
      </div>
      {subtitle}
      <div className="vf-product-price-stock tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2">
        <div className="tw:flex tw:flex-col tw:gap-1">
          {priceLabel && (
            <span className="vf-product-unit-label tw:text-sm tw:text-quiet">{priceLabel}</span>
          )}
          <Price value={price} size="lg" className="vf-product-price" />
        </div>
        {stock}
      </div>
      {description?.paragraphs.map((text, index) => (
        <p
          key={index}
          lang={description.locale}
          dir={description.locale && (description.locale === 'fa' ? 'rtl' : 'ltr')}
          className="vf-product-description tw:text-secondary tw:m-0 tw:max-w-[52ch] tw:text-base tw:leading-body tw:text-pretty"
        >
          {text}
        </p>
      ))}
    </div>
  );
}
