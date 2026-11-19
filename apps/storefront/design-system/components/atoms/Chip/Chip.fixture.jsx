import React from 'react';
import {Chip} from './Chip.jsx';

export function Fixture() {
  const [picked, setPicked] = React.useState('Dried');
  return (
    <div style={{display: 'flex', gap: 8}}>
      {['Fresh', 'Dried', 'Wild'].map(name => (
        <Chip key={name} selected={picked === name} onClick={() => setPicked(name)}>
          {name}
        </Chip>
      ))}
      <Chip disabled>Seasonal</Chip>
    </div>
  );
}
