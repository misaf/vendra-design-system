import React from 'react';
import {ProductCard} from '../../../../../design-system/components/ProductCard/ProductCard.jsx';
import type {ProductCardProps} from '../../../../../design-system/components/ProductCard/ProductCard.js';

type Recommendation = Pick<ProductCardProps, 'images' | 'name' | 'price' | 'stock' | 'href'> & {
  sub?: string;
};

type NotFoundProductsProps = {
  products: Recommendation[];
  photoLabel?: string;
  saveLabel?: string;
};

export function StorefrontNotfoundProducts({
  products,
  photoLabel,
  saveLabel
}: NotFoundProductsProps) {
  return (
    <>
      {products.map((p, $index) => (
        <React.Fragment key={$index}>
          <ProductCard
            images={p?.images}
            name={p?.name}
            subtitle={p?.sub}
            price={p?.price}
            stock={p?.stock}
            frame="soft"
            placeholder={photoLabel}
            favLabel={saveLabel}
            href={p?.href}
          />
        </React.Fragment>
      ))}
    </>
  );
}
