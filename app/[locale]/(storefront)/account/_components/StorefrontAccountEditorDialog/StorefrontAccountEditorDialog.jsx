import React from 'react';
import {Alert} from '../../../../../../components/ui/patterns/molecules/Alert/Alert.jsx';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {Dialog} from '../../../../../../components/ui/components/Dialog/Dialog.jsx';
import {ErrorSummary} from '../../../../../../components/ui/patterns/molecules/ErrorSummary/ErrorSummary.jsx';

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
