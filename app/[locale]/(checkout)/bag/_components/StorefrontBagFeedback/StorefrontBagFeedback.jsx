import React from 'react';
import {Alert} from '../../../../../../components/ui/patterns/molecules/Alert/Alert.jsx';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {EmptyState} from '../../../../../../components/ui/patterns/molecules/EmptyState/EmptyState.jsx';

export function StorefrontBagFeedback({variant, labels, onAction}) {
  if (variant === 'removed')
    return (
      <div className="vf-bag-undo tw:mb-4">
        <Alert
          title={labels.title}
          action={
            <Button id="vf-bag-undo" data-vf-keep-focus variant="secondary" onClick={onAction}>
              {labels.action}
            </Button>
          }
        />
      </div>
    );
  return (
    <div className="vf-bag-empty tw:flex tw:flex-col tw:items-center tw:py-7 tw:px-0 tw:gap-4h">
      <EmptyState
        icon="shopping-bag"
        headingLevel={1}
        title={labels.title}
        titleAccent={labels.accent}
        body={labels.body}
      />
      <Button variant="primary" onClick={onAction}>
        <>{labels.action}</>
      </Button>
    </div>
  );
}
