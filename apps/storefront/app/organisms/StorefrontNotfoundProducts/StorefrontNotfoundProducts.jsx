import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontNotfoundProducts({products, photoLabel, saveLabel}) {
  return (
    <>
      {products.map((p, $index) => (
        <React.Fragment key={$index}>
          <DS.ProductCard
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
