import React from 'react';
import {TrustSeal} from './TrustSeal.jsx';

export function Fixture() {
  return (
    <div style={{display: 'flex', gap: 12}}>
      <TrustSeal kind="enamad" href="https://enamad.ir/" image="/missing-seal.png" />
      <TrustSeal kind="samandehi" href="https://samandehi.ir/" />
      <TrustSeal
        kind="enamad"
        href="https://enamad.ir/"
        image="/assets/placeholder.svg"
        label="Our eNamad seal"
      />
    </div>
  );
}
