import {StorefrontLink} from '../../../../../../../shared/ui/StorefrontLink.jsx';
import React from 'react';
import {Accordion} from '../../../../../../../components/ui/patterns/molecules/Accordion/Accordion.jsx';
import {Icon} from '../../../../../../../components/ui/components/Icon/Icon.jsx';

export function StorefrontProductCare({deliveryText, inquiry, items}) {
  return (
    <>
      <div className="vf-product-delivery tw:flex tw:items-center tw:gap-3 tw:text-sm tw:text-quiet">
        <Icon name="truck" size={18} />
        <span>
          <>{deliveryText}</>
        </span>
      </div>
      {inquiry.href ? (
        <>
          <StorefrontLink
            className="vf-product-ask tw:flex tw:items-center tw:in-data-[density=tv]:min-h-tap tw:gap-3 tw:text-sm tw:text-secondary tw:self-start tw:[text-underline-offset:3px]"
            href={inquiry.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="message-circle" size={18} />
            <span>
              <>{inquiry.label}</>
            </span>
          </StorefrontLink>
        </>
      ) : null}
      <Accordion items={items} defaultValue="care" />
    </>
  );
}
