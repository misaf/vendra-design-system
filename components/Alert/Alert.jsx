import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {IconButton} from '../IconButton/IconButton.jsx';
import {cx} from '../utils/cx.js';

const ALERT_ICONS = {
  neutral: 'info',
  warning: 'triangle-alert',
  danger: 'circle-alert',
  success: 'circle-check'
};

// An inline message. danger and warning interrupt screen readers (role="alert"); the others are
// announced politely (role="status"). `icon={false}` hides the icon.
export function Alert({
  tone = 'neutral',
  icon,
  title,
  children,
  action,
  onClose,
  closeLabel = 'Dismiss',
  className = '',
  style
}) {
  const role = tone === 'danger' || tone === 'warning' ? 'alert' : 'status';
  return (
    <div role={role} className={cx('ag-alert', 'ag-alert--' + tone, className)} style={style}>
      {icon !== false && (
        <Icon
          name={icon || ALERT_ICONS[tone] || ALERT_ICONS.neutral}
          size={20}
          className="ag-alert__icon"
        />
      )}
      <div className="ag-alert__body">
        <div className="ag-alert__msg">
          {title && <div className="ag-alert__title">{title}</div>}
          {children && <div className="ag-alert__text">{children}</div>}
        </div>
        {action && <div className="ag-alert__action">{action}</div>}
      </div>
      {onClose && (
        <IconButton icon="x" label={closeLabel} className="ag-alert__close" onClick={onClose} />
      )}
    </div>
  );
}
