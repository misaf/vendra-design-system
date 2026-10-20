import React from 'react';
import {SkipLink} from './SkipLink.jsx';

export function Fixture() {
  return (
    <div>
      <SkipLink>Skip to content</SkipLink>
      <nav aria-label="Site">
        <a href="#shop">Shop</a>
      </nav>
      <main id="main">
        <h1>Bouquets</h1>
      </main>
    </div>
  );
}
