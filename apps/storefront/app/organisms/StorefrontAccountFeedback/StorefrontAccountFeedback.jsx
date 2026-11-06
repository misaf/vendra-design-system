import React from 'react';

export function StorefrontAccountFeedback({notice}) {
  return (
    <p role="status" className="tw:text-sm tw:text-secondary">
      <>{notice}</>
    </p>
  );
}
