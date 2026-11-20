import React from 'react';
import {ProductCard} from '../../../../components/ui/patterns/molecules/ProductCard/ProductCard.jsx';

export function StorefrontNotfoundProducts({products, photoLabel, saveLabel}) {
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
