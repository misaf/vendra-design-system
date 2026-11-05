import React from 'react';
import * as DS from '../../ds.js';
import {CollectionCarousel} from '../../../_shared/collection-carousel.jsx';

export function StorefrontProductRecent({products, labels, resetKey}) {
  return (
    <section className="vf-product-recent tw:flex tw:flex-col">
      <DS.SectionHeader eyebrow={labels.eyebrow} title={labels.title} accent={labels.accent} />
      <CollectionCarousel
        key={resetKey}
        total={products.length}
        countLabel={labels.count}
        label={labels.region}
        perView={4}
        perViewMobile={1.15}
        itemMin="220px"
        gap="20px"
        arrows={true}
        prevLabel={labels.previous}
        nextLabel={labels.next}
      >
        {products.map((p, $index) => (
          <React.Fragment key={$index}>
            <DS.ProductCard
              images={p?.images}
              sizes={
                products.length === 1
                  ? '(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 25vw'
                  : '(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 25vw'
              }
              name={p?.name}
              subtitle={p?.sub}
              price={p?.price}
              stock={p?.stock}
              frame="soft"
              placeholder={labels.photo}
              favLabel={labels.save}
              favorite={p?.fav}
              onFavorite={p?.toggleFav}
              href={p?.href}
            />
          </React.Fragment>
        ))}
      </CollectionCarousel>
    </section>
  );
}
