import React from 'react';
import {ArchFrame} from './ArchFrame.jsx';

export function Fixture() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 160px)', gap: 16}}>
      <ArchFrame src="/assets/placeholder.svg" alt="Lavender Whisper" className="photo" />
      <ArchFrame alt="Bouquet photo" placeholderLabel="photo" className="placeholder" />
      <ArchFrame shape="circle" ratio="4/3" className="circle" />
    </div>
  );
}
