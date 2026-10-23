import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontSavedResults({products, labels}) {
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
            badge={p?.badge}
            badgeTone="accent"
            frame="soft"
            placeholder={labels.photo}
            favLabel={labels.unsave}
            favorite={true}
            onFavorite={p?.remove}
            href={p?.href}
          />
        </React.Fragment>
      ))}
    </>
  );
}
