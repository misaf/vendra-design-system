import React from 'react';

export function StorefrontCheckoutHeading({title, accent}) {
  return (
    <div className="vf-checkout-heading tw:mb-6">
      <h1>
        <>{title} </>
        <em className="vf-checkout-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
          <>{accent}</>
        </em>
      </h1>
    </div>
  );
}
