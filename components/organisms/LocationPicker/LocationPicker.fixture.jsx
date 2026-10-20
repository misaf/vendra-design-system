import React from 'react';
import {loadLeaflet, TILES} from '../../../templates/_e2e/fixtures/leaflet.js';
import {LocationPicker} from './LocationPicker.jsx';

export function Fixture() {
  const [location, setLocation] = React.useState(null);
  return (
    <div style={{maxWidth: 520}}>
      <LocationPicker
        id="pin"
        label="Delivery pin"
        status={location ? 'Pinned' : 'Move the map to put the pin on the door'}
        error={location ? undefined : 'Pin the address to continue'}
        value={location}
        onChange={setLocation}
        loadLeaflet={loadLeaflet}
        tiles={TILES}
        center={[35.8327, 50.9654]}
      />
      <output data-test="location">
        {location ? location.lat.toFixed(4) + ',' + location.lng.toFixed(4) : ''}
      </output>
    </div>
  );
}
