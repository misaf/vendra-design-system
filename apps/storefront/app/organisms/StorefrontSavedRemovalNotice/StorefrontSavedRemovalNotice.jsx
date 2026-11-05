import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontSavedRemovalNotice({message, undo}) {
  return (
    <div className="vf-saved-undo tw:mb-4">
      <DS.Alert
        title={message}
        action={
          <DS.Button
            id="vf-saved-undo"
            data-vf-keep-focus
            variant="secondary"
            onClick={undo.onClick}
          >
            {undo.label}
          </DS.Button>
        }
      />
    </div>
  );
}
