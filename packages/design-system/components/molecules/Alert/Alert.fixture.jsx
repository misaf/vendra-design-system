import React from 'react';
import {Alert} from './Alert.jsx';

export function Fixture() {
  const [shown, setShown] = React.useState(true);
  return (
    <div style={{display: 'grid', gap: 12}}>
      <Alert tone="success" title="Order placed">
        We'll text you when it leaves.
      </Alert>
      <Alert tone="danger" title="Payment failed" action={<a href="#retry">Try again</a>}>
        Your card was not charged.
      </Alert>
      {shown && (
        <Alert tone="info" icon={false} onClose={() => setShown(false)}>
          Same-day delivery ends at 18:00.
        </Alert>
      )}
    </div>
  );
}
