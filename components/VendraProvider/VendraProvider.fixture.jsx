import React from 'react';
import {Alert} from '../molecules/Alert/Alert.jsx';
import {FilterBar} from '../FilterBar/FilterBar.jsx';
import {LanguageSwitch} from '../LanguageSwitch/LanguageSwitch.jsx';
import {NavLink} from '../NavLink/NavLink.jsx';
import {VendraProvider} from './VendraProvider.jsx';

export function Fixture() {
  const [path, setPath] = React.useState('');
  const [events, setEvents] = React.useState([]);
  const [filters, setFilters] = React.useState(['occasion', 'stock']);
  const [language, setLanguage] = React.useState('en');
  return (
    <div>
      <VendraProvider navigate={setPath}>
        <NavLink href="/shop">Shop</NavLink>
      </VendraProvider>
      <output data-test="path">{path}</output>
      <VendraProvider locale="fa-IR" messages={{fa: {Alert: {close: 'بستن پیام'}}}}>
        <Alert onClose={() => {}}>پیام</Alert>
      </VendraProvider>
      <VendraProvider onEvent={event => setEvents(list => [...list, event])}>
        <LanguageSwitch value={language} onChange={setLanguage} />
        <FilterBar
          filters={filters.map(id => ({
            id,
            label: id,
            onRemove: () => setFilters(list => list.filter(item => item !== id))
          }))}
          onClearAll={() => setFilters([])}
        />
      </VendraProvider>
      <output data-test="events">{JSON.stringify(events)}</output>
    </div>
  );
}
