import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

// An empty or finished state: icon disc, eyebrow, title (with an italic `titleAccent` line), body
// and actions. `icon` is a Lucide name or any node.
export function EmptyState({
  icon,
  tone = 'neutral',
  eyebrow,
  title,
  titleAccent,
  body,
  actions,
  headingLevel = 2,
  className = '',
  style
}) {
  const Heading = 'h' + headingLevel;
  return (
    <div className={cx('ag-empty', className)} style={style}>
      {icon && (
        <span className={cx('ag-empty__icon', 'ag-empty__icon--' + tone)}>
          {typeof icon === 'string' ? <Icon name={icon} size={28} /> : icon}
        </span>
      )}
      {eyebrow && <div className="ag-eyebrow ag-empty__eyebrow">{eyebrow}</div>}
      <Heading className="ag-empty__title">
        {title}
        {titleAccent && (
          <>
            <br />
            <em>{titleAccent}</em>
          </>
        )}
      </Heading>
      {body && <div className="ag-empty__body">{body}</div>}
      {actions && <div className="ag-empty__actions">{actions}</div>}
    </div>
  );
}
