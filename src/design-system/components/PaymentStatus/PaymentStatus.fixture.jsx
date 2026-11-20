import React from 'react';
import {PaymentStatus} from './PaymentStatus.jsx';

// Each state side by side, plus one whose status the buttons change (to see focus move). The
// redirect posts to /bank/pay, which the spec answers; with ?auto=1 one more redirects by itself.
export function Fixture() {
  const [status, setStatus] = React.useState('verifying');
  const amount = '2,400,000 Toman';
  const auto = new URLSearchParams(location.search).has('auto');
  return (
    <div style={{display: 'grid', gap: 48, maxWidth: 560}}>
      <section data-state="redirecting">
        <PaymentStatus
          status="redirecting"
          amount={amount}
          orderNumber="VN-10522"
          gateway="Zarinpal"
          redirect={{
            url: '/bank/pay',
            method: 'POST',
            fields: {Token: 'abc123', Amount: '24000000'}
          }}
          redirectDelay={null}
        />
      </section>
      <section data-state="failed">
        <PaymentStatus
          status="failed"
          amount={amount}
          orderNumber="VN-10522"
          supportHref="tel:+989121234567"
          onRetry={() => {}}
          onOtherMethod={() => {}}
        />
      </section>
      <section data-state="pending">
        <PaymentStatus
          status="pending"
          amount={amount}
          orderNumber="VN-10522"
          reference="123456789012"
          supportHref="tel:+989121234567"
          onCheckAgain={() => {}}
        />
      </section>
      <section data-state="live">
        <PaymentStatus
          status={status}
          orderNumber="VN-10523"
          onRetry={() => setStatus('verifying')}
          onCheckAgain={() => setStatus('paid')}
        >
          <button type="button" onClick={() => setStatus('cancelled')}>
            Simulate cancel
          </button>
        </PaymentStatus>
        <button type="button" onClick={() => setStatus('pending')}>
          Bank answers pending
        </button>
      </section>
      {auto && (
        <section data-state="auto">
          <PaymentStatus
            status="redirecting"
            redirect={{url: '/bank/start', fields: {Authority: 'A0000000000000000000000000123456'}}}
            redirectDelay={200}
          />
        </section>
      )}
    </div>
  );
}
