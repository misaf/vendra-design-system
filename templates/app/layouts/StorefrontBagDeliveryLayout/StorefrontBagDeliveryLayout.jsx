import React from 'react';

export function StorefrontBagDeliveryLayout({recipient, location}) {
  return (
    <section
      className="vf-bag-delivery tw:flex tw:flex-col tw:gap-4h"
      aria-labelledby="vf-recipient-title"
    >
      {recipient}
      {location}
    </section>
  );
}
