import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontCheckoutNotices({review, saveError}) {
  return (
    <>
      {review.visible && (
        <div id="vf-payment-review" tabIndex={-1}>
          <DS.Alert
            tone="warning"
            title={review.title}
            action={
              <DS.Button variant="secondary" onClick={review.onReview}>
                {review.label}
              </DS.Button>
            }
          />
        </div>
      )}
      {saveError && <DS.Alert tone="danger" title={saveError} />}
    </>
  );
}
