import React from 'react';
import * as DS from '../../ds.js';
import {CollectionCarousel} from '../../../_shared/collection-carousel.jsx';

export function StorefrontHomeCategories({categories, labels}) {
  return (
    <>
      <DS.SectionHeader level="h1" title={labels.title} accent={labels.titleAccent} />
      <CollectionCarousel
        total={categories.length}
        countLabel={labels.count}
        className="vf-home-category-circles vf-home-carousel"
        label={labels.region}
        perView={9}
        perViewMobile={3.15}
        itemMin="140px"
        gap="20px"
        arrows={true}
        prevLabel={labels.previous}
        nextLabel={labels.next}
      >
        {categories.map((c, $index) => (
          <React.Fragment key={$index}>
            <DS.CategoryCard
              frame="circle"
              label={c?.label}
              href={c?.href}
              image={c?.image}
              sizes="(max-width: 767px) 45vw, 140px"
            />
          </React.Fragment>
        ))}
      </CollectionCarousel>
    </>
  );
}
