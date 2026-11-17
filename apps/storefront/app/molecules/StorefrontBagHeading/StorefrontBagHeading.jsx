import React from 'react';

export function StorefrontBagHeading({
  showBag,
  showDelivery,
  bagTitle,
  bagAccent,
  deliveryTitle,
  deliveryAccent
}) {
  return (
    <>
      {showBag ? (
        <>
          <h1>
            <>{bagTitle} </>
            <em className="vf-bag-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
              <>{bagAccent}</>
            </em>
          </h1>
        </>
      ) : null}
      {showDelivery ? (
        <>
          <h1>
            <>{deliveryTitle} </>
            <em className="vf-bag-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
              <>{deliveryAccent}</>
            </em>
          </h1>
        </>
      ) : null}
    </>
  );
}
