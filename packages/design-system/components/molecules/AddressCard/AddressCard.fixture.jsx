import React from 'react';
import {AddressCard} from './AddressCard.jsx';

export function Fixture() {
  const [action, setAction] = React.useState('');
  return (
    <div style={{display: 'grid', gap: 16, maxWidth: 420}}>
      <AddressCard
        label="Home"
        line="Azimiyeh, 3rd Street, No. 12"
        recipient="Shirin Ahmadi"
        phone="0912 564 9438"
        zone="Karaj central"
        isDefault
        onEdit={() => setAction('edit home')}
        onDelete={() => setAction('delete home')}
      />
      <AddressCard
        label="Office"
        line="Gohardasht, Block 4"
        onMakeDefault={() => setAction('default office')}
      />
      <output data-test="action">{action}</output>
    </div>
  );
}
