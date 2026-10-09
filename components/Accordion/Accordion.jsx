import React from 'react';
import {Button, Disclosure, DisclosureGroup, DisclosurePanel, Heading} from 'react-aria-components';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

const toList = value => (value == null ? [] : Array.isArray(value) ? value : [value]);

// Disclosure panels under real headings, on React Aria's DisclosureGroup. Controlled with `openId`
// (one id or a list), uncontrolled with `defaultOpenId`; `allowMultiple` keeps other panels open.
// Each button has aria-expanded and controls its panel, a region named by the button.
export function Accordion({
  items = [],
  openId,
  defaultOpenId,
  onToggle,
  allowMultiple,
  headingLevel = 3,
  className = ''
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(toList(defaultOpenId));
  const openIds = openId !== undefined ? toList(openId) : uncontrolledOpen;
  const change = keys => {
    const next = [...keys].map(String);
    const toggled =
      next.find(id => !openIds.includes(id)) || openIds.find(id => !next.includes(id));
    if (openId === undefined) setUncontrolledOpen(next);
    if (toggled !== undefined && onToggle) onToggle(toggled, next.includes(toggled), next);
  };
  return (
    <DisclosureGroup
      expandedKeys={openIds}
      onExpandedChange={change}
      allowsMultipleExpanded={!!allowMultiple}
      className={cx('ag-acc', className)}
    >
      {items.map(item => (
        <Disclosure
          key={item.id}
          id={item.id}
          className={({isExpanded}) => cx('ag-acc__item', isExpanded && 'ag-acc__item--open')}
        >
          <Heading level={headingLevel} className="ag-acc__h">
            <Button slot="trigger" className="ag-acc__btn">
              <span>{item.title}</span>
              <Icon name="chevron-down" size={18} className="ag-acc__chev" />
            </Button>
          </Heading>
          <DisclosurePanel role="region" className="ag-acc__panel">
            <div className="ag-acc__clip">
              <div className="ag-acc__content">{item.content}</div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}
