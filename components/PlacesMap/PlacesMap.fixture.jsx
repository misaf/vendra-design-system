import React from 'react';
import {loadLeaflet, TILES} from '../../templates/_e2e/fixtures/leaflet.js';
import {PlacesMap} from './PlacesMap.jsx';

export function Fixture() {
  const [opened, setOpened] = React.useState('');
  return (
    <div style={{maxWidth: 520}}>
      <PlacesMap
        id="places"
        label="Saved addresses"
        loadLeaflet={loadLeaflet}
        tiles={TILES}
        center={[35.8327, 50.9654]}
        places={[
          {
            id: 'home',
            label: 'Home',
            title: 'Open Home',
            location: {lat: 35.8352, lng: 50.975},
            onSelect: () => setOpened('home')
          },
          {
            id: 'office',
            label: 'Office',
            title: 'Open Office',
            location: {lat: 35.82, lng: 50.95},
            onSelect: () => setOpened('office')
          },
          {id: 'unpinned', label: 'Unpinned', title: 'Unpinned', location: null}
        ]}
      />
      <output data-test="opened">{opened}</output>
    </div>
  );
}
