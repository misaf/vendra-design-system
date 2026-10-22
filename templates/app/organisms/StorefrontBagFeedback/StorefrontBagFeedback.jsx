import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontBagFeedback({variant, labels, onAction}) {
  if (variant === 'removed')
    return (
      <div className="vf-bag-undo tw:mb-4">
        <DS.Alert
          title={labels.title}
          action={
            <DS.Button id="vf-bag-undo" data-vf-keep-focus variant="secondary" onClick={onAction}>
              {labels.action}
            </DS.Button>
          }
        />
      </div>
    );
  return (
    <div className="vf-bag-empty tw:flex tw:flex-col tw:items-center tw:py-7 tw:px-0 tw:gap-4h">
      <DS.EmptyState
        icon="shopping-bag"
        headingLevel={1}
        title={labels.title}
        titleAccent={labels.accent}
        body={labels.body}
      />
      <DS.Button variant="primary" onClick={onAction}>
        <>{labels.action}</>
      </DS.Button>
    </div>
  );
}
