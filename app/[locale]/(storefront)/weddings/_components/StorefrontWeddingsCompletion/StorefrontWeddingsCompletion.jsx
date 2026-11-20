import React from 'react';
import {Alert} from '../../../../../../ui/components/Alert/Alert.jsx';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';

export function StorefrontWeddingsCompletion({title, body, edit}) {
  return (
    <div
      id="vf-weddings-success"
      tabIndex={-1}
      role="region"
      aria-label={title}
      className="tw:flex tw:flex-col tw:gap-4"
    >
      <Alert tone="success" title={title}>
        <>{body}</>
      </Alert>
      <div>
        <Button variant="secondary" onClick={edit.onClick}>
          <>{edit.label}</>
        </Button>
      </div>
    </div>
  );
}
