import React from 'react';
import {Alert} from '../../../../../design-system/components/Alert/Alert.jsx';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';

export function StorefrontCheckoutNotices({review, saveError}) {
  return (
    <>
      {review.visible && (
        <div id="vf-payment-review" tabIndex={-1} data-vf-keep-focus="true">
          <Alert
            tone="warning"
            title={review.title}
            action={
              <Button variant="secondary" onClick={review.onReview}>
                {review.label}
              </Button>
            }
          />
        </div>
      )}
      {saveError && <Alert tone="danger" title={saveError} />}
    </>
  );
}
