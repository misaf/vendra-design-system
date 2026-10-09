import React from 'react';
import {I18nProvider, Tab, TabList, TabPanel, Tabs as AriaTabs} from 'react-aria-components';
import {cx} from '../utils/cx.js';
import {usePageLocale} from '../utils/locale.js';

// Tabs on React Aria: one Tab stop on the selected tab; arrow keys (mirrored in RTL, following the
// page's language), Home and End move and select. `children` is the selected tab's content: it
// renders in a tabpanel linked to its tab. Without children the component is just the tab list.
export function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  label,
  className = '',
  listClassName,
  panelClassName,
  children
}) {
  const {locale, ref} = usePageLocale();
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? items[0]?.id);
  const selected = value ?? uncontrolledValue;
  // A value that matches no tab selects the first, so there is always one Tab stop.
  const selectedKey = items.some(item => item.id === selected) ? selected : items[0]?.id;
  const list = (
    <TabList
      aria-label={label}
      className={cx('ag-tabs', variant === 'pill' && 'ag-tabs--pill', className)}
    >
      {items.map(item => (
        <Tab
          key={item.id}
          id={item.id}
          className={({isSelected}) => cx('ag-tab', isSelected && 'ag-tab--active')}
        >
          {item.label}
        </Tab>
      ))}
    </TabList>
  );
  return (
    <I18nProvider locale={locale}>
      <AriaTabs
        ref={ref}
        selectedKey={selectedKey ?? null}
        onSelectionChange={key => {
          const id = String(key);
          if (value === undefined) setUncontrolledValue(id);
          onChange && onChange(id);
        }}
        className="ag-tabs-root"
      >
        {listClassName ? <div className={listClassName}>{list}</div> : list}
        {/* A new panel per tab: React Aria links a panel to its tab when the panel mounts. Without
            children the panel is empty and not displayed (React Aria sets the selected panel's own
            hidden attribute), so the tab's aria-controls still points at a real element. */}
        {selectedKey != null && (
          <TabPanel
            key={selectedKey}
            id={selectedKey}
            className={panelClassName}
            style={children == null ? {display: 'none'} : undefined}
          >
            {children}
          </TabPanel>
        )}
      </AriaTabs>
    </I18nProvider>
  );
}
