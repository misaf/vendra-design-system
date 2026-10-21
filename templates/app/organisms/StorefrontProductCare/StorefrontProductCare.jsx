import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontProductCare({deliveryText, inquiry, items}) {
  return (
    <>
      <div className="vf-product-delivery tw:flex tw:items-center tw:gap-3 tw:text-sm tw:text-quiet">
        <DS.Icon name="truck" size={18} />
        <span>
          <>{deliveryText}</>
        </span>
      </div>
      {inquiry.href ? (
        <>
          <a
            className="vf-product-ask tw:flex tw:items-center tw:in-data-[density=tv]:min-h-tap tw:gap-3 tw:text-sm tw:text-secondary tw:self-start tw:[text-underline-offset:3px]"
            href={inquiry.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DS.Icon name="message-circle" size={18} />
            <span>
              <>{inquiry.label}</>
            </span>
          </a>
        </>
      ) : null}
      <DS.Accordion items={items} defaultValue="care" />
    </>
  );
}
