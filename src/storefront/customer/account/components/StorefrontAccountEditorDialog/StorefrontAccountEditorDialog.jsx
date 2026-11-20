import React from 'react';
import {Alert} from '../../../../../design-system/components/Alert/Alert.jsx';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {Dialog} from '../../../../../design-system/components/Dialog/Dialog.jsx';
import {ErrorSummary} from '../../../../../design-system/components/ErrorSummary/ErrorSummary.jsx';

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
    <Dialog open={open} title={title} onClose={onClose}>
      <div className="tw:flex tw:flex-col tw:gap-4">
        {saveError && <Alert tone="danger" title={saveError} />}
        <ErrorSummary id="vf-editor-errors" errors={problems} />
        {children}
        <div className="tw:flex tw:gap-3">
          <Button onClick={save.onClick}>
            <>{save.label}</>
          </Button>
          <Button variant="ghost" onClick={onClose}>
            <>{cancelLabel}</>
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
