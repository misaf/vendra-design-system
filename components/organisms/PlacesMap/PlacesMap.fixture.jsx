import React from 'react';
import {loadLeaflet, TILES} from '../../../apps/storefront/e2e/fixtures/leaflet.js';
import {PlacesMap} from './PlacesMap.jsx';

export function Fixture({lang = 'en'}) {
  const [mounted, setMounted] = React.useState(true);
  const [opened, setOpened] = React.useState('');
  return (
    <div style={{maxWidth: 520}}>
      <button onClick={() => setMounted(value => !value)}>Toggle map</button>
      {mounted && (
        <PlacesMap
          id="places"
          label="Saved addresses"
          loadLeaflet={loadLeaflet}
          tiles={TILES}
          center={[35.8327, 50.9654]}
          places={[
            {
              id: 'home',
              label: lang === 'fa' ? 'خانه' : 'Home',
              title: 'Open Home',
              location: {lat: 35.8352, lng: 50.975},
              onSelect: () => setOpened('home')
            },
            {
              id: 'office',
              label: lang === 'fa' ? 'دفتر' : 'Office',
              title: 'Open Office',
              location: {lat: 35.82, lng: 50.95},
              onSelect: () => setOpened('office')
            },
            {id: 'unpinned', label: 'Unpinned', title: 'Unpinned', location: null}
          ]}
        />
      )}
      <output data-test="opened">{opened}</output>
    </div>
  );
}
