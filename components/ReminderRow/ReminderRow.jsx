import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {Badge} from '../Badge/Badge.jsx';
import {IconButton} from '../IconButton/IconButton.jsx';
import {Button} from '../Button/Button.jsx';
import {Switch} from '../Switch/Switch.jsx';
import {cx} from '../utils/cx.js';
const RR_DEF = {
  paused: 'Paused',
  sendFlowers: 'Send flowers',
  reminderFor: 'Reminder for {name}',
  edit: 'Edit reminder for {name}',
  delete: 'Delete reminder for {name}'
};
// One occasion reminder: arched date tile · name + meta · controls (drop below on narrow widths via container query).
export function ReminderRow({
  name,
  day,
  month,
  occasion,
  occasionIcon = 'calendar-heart',
  before,
  channel = 'sms',
  altDate,
  when,
  soon,
  on = true,
  onToggle,
  onEdit,
  onDelete,
  sendHref,
  sendOnClick,
  labels,
  className = '',
  style
}) {
  const L = {...RR_DEF, ...labels};
  const nm = s => s.replace('{name}', typeof name === 'string' ? name : '');
  return (
    <div className={cx('ag-remwrap', className)} style={style}>
      <div className={cx('ag-rem', soon && on && 'ag-rem--soon')}>
        <div className={cx('ag-rem__tile', !on && 'ag-rem__tile--paused')} aria-hidden="true">
          <span className="ag-rem__day">{day}</span>
          <span className="ag-rem__month">{month}</span>
        </div>
        <div className="ag-rem__body">
          <div className="ag-rem__head">
            <span className="ag-rem__name">{name}</span>
            {on ? (
              when && <Badge tone={soon ? 'accent' : 'neutral'}>{when}</Badge>
            ) : (
              <Badge tone="neutral">{L.paused}</Badge>
            )}
          </div>
          <div className="ag-rem__meta">
            <span className="ag-rem__bit">
              <Icon name={occasionIcon} size={14} />
              {occasion}
            </span>
            <span className="ag-rem__bit">
              {day} {month}
              {altDate && <span> ({altDate})</span>}
            </span>
            {before && (
              <span className="ag-rem__bit">
                <Icon name={channel === 'wa' ? 'message-circle' : 'message-square'} size={14} />
                {before}
              </span>
            )}
          </div>
        </div>
        <div className="ag-rem__controls">
          {soon && on && (sendHref || sendOnClick) && (
            <Button size="sm" variant="secondary" href={sendHref} onClick={sendOnClick}>
              {L.sendFlowers}
            </Button>
          )}
          <Switch
            checked={on}
            onChange={e => onToggle && onToggle(e.target.checked)}
            aria-label={nm(L.reminderFor)}
          />
          {onEdit && <IconButton icon="pencil" size="sm" label={nm(L.edit)} onClick={onEdit} />}
          {onDelete && (
            <IconButton icon="trash-2" size="sm" label={nm(L.delete)} onClick={onDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
