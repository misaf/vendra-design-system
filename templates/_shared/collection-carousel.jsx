import React from 'react';
import {Carousel} from '../../components/Carousel/Carousel.jsx';

// Storefront collections share measured navigation, counts and responsive card sizing.
export function CollectionCarousel({total, countLabel, perView, label, className = '', ...props}) {
  const [overflow, setOverflow] = React.useState(null);
  return (
    <div
      className="vf-collection"
      data-items={total}
      data-fits-row={total <= perView ? 'true' : undefined}
      data-overflow={overflow == null ? undefined : String(overflow)}
    >
      <span className="vf-collection-count" aria-hidden="true">
        {countLabel}
      </span>
      <Carousel
        {...props}
        className={`vf-collection-carousel ${className}`}
        label={`${label} · ${countLabel}`}
        perView={perView}
        onScrollStateChange={({canPrev, canNext}) => setOverflow(canPrev || canNext)}
      />
    </div>
  );
}
