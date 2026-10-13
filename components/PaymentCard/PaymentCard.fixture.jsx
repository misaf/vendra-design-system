import React from 'react';
import {PaymentCard} from './PaymentCard.jsx';

export function Fixture() {
  const [copied, setCopied] = React.useState('');
  return (
    <div style={{maxWidth: 420}}>
      <PaymentCard
        cardNumber="۶۰۳۷۹۹۱۲۳۴۵۶۷۸۹۰"
        holder="Vendra Florist"
        bank="Melli"
        amount="4,600,000 Toman"
        onCopy={setCopied}
      />
      <output data-test="copied">{copied}</output>
    </div>
  );
}
