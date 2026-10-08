import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

const toList = value => (value == null ? [] : Array.isArray(value) ? value : [value]);

// Disclosure panels under real headings. Controlled with `openId` (one id or a list),
// uncontrolled with `defaultOpenId`; `allowMultiple` keeps other panels open.
export function Accordion({
  items = [],
  openId,
  defaultOpenId,
  onToggle,
  allowMultiple,
  headingLevel = 3,
  className = ''
}) {
  const baseId = React.useId();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(toList(defaultOpenId));
  const openIds = openId !== undefined ? toList(openId) : uncontrolledOpen;
  const toggle = id => {
    const wasOpen = openIds.includes(id);
    const next = wasOpen
      ? openIds.filter(other => other !== id)
      : allowMultiple
        ? [...openIds, id]
        : [id];
    if (openId === undefined) setUncontrolledOpen(next);
    onToggle && onToggle(id, !wasOpen, next);
  };
  const Heading = 'h' + headingLevel;
  return (
    <div className={cx('ag-acc', className)}>
      {items.map(item => {
        const isOpen = openIds.includes(item.id);
        const buttonId = baseId + 'b' + item.id;
        const panelId = baseId + 'p' + item.id;
        return (
          <div key={item.id} className={cx('ag-acc__item', isOpen && 'ag-acc__item--open')}>
            <Heading className="ag-acc__h">
              <button
                type="button"
                id={buttonId}
                className="ag-acc__btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <Icon name="chevron-down" size={18} className="ag-acc__chev" />
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="ag-acc__panel">
              <div className="ag-acc__clip">
                <div className="ag-acc__content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
