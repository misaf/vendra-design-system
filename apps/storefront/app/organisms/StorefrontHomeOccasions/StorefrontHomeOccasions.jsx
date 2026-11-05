import React from 'react';
import * as DS from '../../ds.js';
import {CollectionCarousel} from '../../../_shared/collection-carousel.jsx';

export function StorefrontHomeOccasions({occasions, labels, frame}) {
  return (
    <>
      <DS.SectionHeader id="vf-home-occasions-title" title={labels.title} accent={labels.accent} />
      <p className="tw:m-0 tw:text-secondary tw:max-w-measure">{labels.description}</p>
      <CollectionCarousel
        total={occasions.length}
        countLabel={labels.count}
        className="vf-home-category-row vf-home-carousel"
        label={labels.region}
        perView={4}
        perViewMobile={1.15}
        itemMin="220px"
        gap="20px"
        arrows={true}
        prevLabel={labels.previous}
        nextLabel={labels.next}
      >
        {occasions.map((c, $index) => (
          <React.Fragment key={$index}>
            <DS.CategoryCard
              label={c?.label}
              count={c?.count}
              image={c?.image}
              sizes="(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 25vw"
              frame={frame}
              aspect="1/1"
              href={c?.href}
            />
          </React.Fragment>
        ))}
      </CollectionCarousel>
    </>
  );
}
