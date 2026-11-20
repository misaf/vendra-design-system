import React from 'react';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';
import {Card} from '../../../../../../ui/components/Card/Card.jsx';
import {DetailList} from '../../../../../../ui/components/DetailList/DetailList.jsx';

export function StorefrontCheckoutDeliveryReview({labels, edit, rows}) {
  return (
    <section aria-labelledby="vf-delivery-review-title">
      <Card padding={16} className="vf-checkout-delivery-review">
        <div className="tw:flex tw:items-center tw:justify-between tw:flex-wrap tw:gap-2 tw:mb-3">
          <h2 id="vf-delivery-review-title" className="tw:m-0 tw:text-lg! tw:leading-snug">
            {labels.title}
          </h2>
          <Button
            variant="ghost"
            size="md"
            iconStart="pencil"
            href={edit.href}
            onClick={edit.onClick}
          >
            {labels.edit}
          </Button>
        </div>
        <DetailList rows={rows} />
      </Card>
    </section>
  );
}
