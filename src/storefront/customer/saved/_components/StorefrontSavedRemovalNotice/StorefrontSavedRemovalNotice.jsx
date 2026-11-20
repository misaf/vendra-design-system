import React from 'react';
import {Alert} from '../../../../../design-system/components/Alert/Alert.jsx';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';

export function StorefrontSavedRemovalNotice({message, undo}) {
  return (
    <div className="vf-saved-undo tw:mb-4">
      <Alert
        title={message}
        action={
          <Button id="vf-saved-undo" data-vf-keep-focus variant="secondary" onClick={undo.onClick}>
            {undo.label}
          </Button>
        }
      />
    </div>
  );
}
