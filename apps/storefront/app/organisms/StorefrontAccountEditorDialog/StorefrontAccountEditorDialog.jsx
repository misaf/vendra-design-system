import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontAccountEditorDialog({
  open,
  title,
  onClose,
  saveError,
  problems,
  save,
  cancelLabel,
  children
}) {
  return (
    <DS.Dialog open={open} title={title} onClose={onClose}>
      <div className="tw:flex tw:flex-col tw:gap-4">
        {saveError && <DS.Alert tone="danger" title={saveError} />}
        <DS.ErrorSummary id="vf-editor-errors" errors={problems} />
        {children}
        <div className="tw:flex tw:gap-3">
          <DS.Button onClick={save.onClick}>
            <>{save.label}</>
          </DS.Button>
          <DS.Button variant="ghost" onClick={onClose}>
            <>{cancelLabel}</>
          </DS.Button>
        </div>
      </div>
    </DS.Dialog>
  );
}
