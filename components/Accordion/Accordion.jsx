import React from 'react';
import {Button, Disclosure, DisclosureGroup, DisclosurePanel, Heading} from 'react-aria-components';
import {Icon} from '../atoms/Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

const toList = value => (value == null ? [] : Array.isArray(value) ? value : [value]);

// Disclosure panels under real headings, on React Aria's DisclosureGroup. Controlled with `value`
// (the open ids), uncontrolled with `defaultValue`; onChange(ids) gets the open ids. `allowMultiple`
// keeps other panels open.
// Each button has aria-expanded and controls its panel, a region named by the button.
export function Accordion({
  items = [],
  value,
  defaultValue,
  onChange,
  allowMultiple,
  headingLevel = 3,
  className = ''
}) {
  return (
    <DisclosureGroup
      expandedKeys={value === undefined ? undefined : toList(value)}
      defaultExpandedKeys={toList(defaultValue)}
      onExpandedChange={keys => onChange && onChange([...keys].map(String))}
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
