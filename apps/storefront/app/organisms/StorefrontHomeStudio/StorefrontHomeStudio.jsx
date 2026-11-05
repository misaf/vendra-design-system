import React from 'react';
import * as DS from '../../ds.js';
import {CollectionCarousel} from '../../../_shared/collection-carousel.jsx';

export function StorefrontHomeStudio({products, labels, shopHref, frame}) {
  return (
    <>
      <DS.SectionHeader
        id="vf-home-studio-title"
        eyebrow={labels.eyebrow}
        title={labels.title}
        accent={labels.accent}
        action={
          <DS.Button variant="ghost" iconEnd="arrow-right" href={shopHref}>
            {labels.all}
          </DS.Button>
        }
      />
      <p className="tw:m-0 tw:text-secondary tw:max-w-measure">{labels.description}</p>
      <CollectionCarousel
        total={products.length}
        countLabel={labels.count}
        className="vf-home-product-row vf-home-product-carousel vf-home-carousel"
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
              sizes="(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 25vw"
              priority={$index < 2}
              name={p?.name}
              subtitle={p?.sub}
              price={p?.price}
              stock={p?.stock}
              badge={p?.badge}
              badgeTone="accent"
              frame={frame}
              placeholder={labels.photo}
              favLabel={labels.save}
              favorite={p?.fav}
              onFavorite={p?.toggleFav}
              href={p?.href}
            />
          </React.Fragment>
        ))}
      </CollectionCarousel>
    </>
  );
}
