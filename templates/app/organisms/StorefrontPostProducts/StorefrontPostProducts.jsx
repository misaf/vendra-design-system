import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPostProducts({products}) {
  return (
    <div className="vf-product-grid tw:grid tw:gap-5 tw:mt-5 tw:grid-cols-2 tw:md:grid-cols-3">
      {products.map((p, $index) => (
        <React.Fragment key={$index}>
          <DS.ProductCard
            name={p?.name}
            price={p?.price}
            stock={p?.stock}
            images={p?.images}
            href={p?.href}
            frame="soft"
          />
        </React.Fragment>
      ))}
    </div>
  );
}
