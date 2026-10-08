import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {Button} from '../Button/Button.jsx';

const ICONS = {
  success: 'circle-check',
  info: 'flower-2',
  warning: 'triangle-alert',
  danger: 'circle-alert'
};
// The toast itself is never a click target — put the follow-up in `action` (a real button or link).
export function Toast({
  tone = 'success',
  title,
  message,
  action,
  onClose,
  closeLabel = 'Dismiss',
  style
}) {
  return (
    <div role="status" className="ag-toast" style={style}>
      <Icon name={ICONS[tone]} size={20} className={'ag-toast__icon--' + tone} />
      <div className="ag-toast__body">
        <div className="ag-toast__title">{title}</div>
        {message && <div className="ag-toast__msg">{message}</div>}
        {action && (
          <Button
            variant="ghost"
            size="sm"
            className="ag-toast__action"
            href={action.href}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
      {onClose && (
        <button type="button" className="ag-toast__close" aria-label={closeLabel} onClick={onClose}>
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
