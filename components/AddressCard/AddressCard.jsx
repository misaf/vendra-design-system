import React from 'react';
import {Badge} from '../Badge/Badge.jsx';
import {IconButton} from '../IconButton/IconButton.jsx';
import {Button} from '../Button/Button.jsx';
import {cx} from '../utils/cx.js';
import {useMessages} from '../utils/messages.js';

// Saved delivery address. Edit / delete IconButtons get specific names ("Edit Home", "Delete Home").
export function AddressCard({
  label,
  line,
  recipient,
  phone,
  zone,
  isDefault,
  onEdit,
  onDelete,
  onMakeDefault,
  labels,
  className = '',
  style
}) {
  const text = useMessages('AddressCard', labels);
  const named = template => template.replace('{name}', label || '');
  return (
    <div className={cx('ag-card', 'ag-addr', className)} style={style}>
      <div className="ag-addr__head">
        <span className="ag-addr__label">{label}</span>
        <div className="ag-addr__tools">
          {isDefault && <Badge tone="accent">{text.default}</Badge>}
          {onEdit && (
            <IconButton icon="pencil" size="sm" label={named(text.edit)} onClick={onEdit} />
          )}
          {onDelete && (
            <IconButton icon="trash-2" size="sm" label={named(text.delete)} onClick={onDelete} />
          )}
        </div>
      </div>
      <div className="ag-addr__line">{line}</div>
      <div className="ag-addr__meta">
        {[
          recipient,
          phone && (
            <span key="p" dir="ltr">
              {phone}
            </span>
          ),
          zone
        ]
          .filter(Boolean)
          .map((part, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              {part}
            </React.Fragment>
          ))}
      </div>
      {!isDefault && onMakeDefault && (
        <div>
          <Button variant="ghost" size="sm" onClick={onMakeDefault} className="ag-addr__default">
            {text.makeDefault}
          </Button>
        </div>
      )}
    </div>
  );
}
