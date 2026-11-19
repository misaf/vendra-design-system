import React from 'react';
import {ErrorBoundary} from './ErrorBoundary.jsx';

// A part that fails while `broken` is on; reports go to <output data-test="reported">.
function Part({broken}) {
  if (broken) throw new Error('No price for VF-7K2M4Q');
  return <p className="part">Recently viewed</p>;
}

export function Fixture() {
  const [broken, setBroken] = React.useState(true);
  const [reported, setReported] = React.useState('');
  const [key, setKey] = React.useState(0);
  return (
    <div style={{display: 'grid', gap: 16, maxWidth: 520}}>
      <p className="around">The rest of the page</p>
      <ErrorBoundary
        className="default"
        resetKey={key}
        onError={error => setReported(String(error.message))}
      >
        <Part broken={broken} />
      </ErrorBoundary>
      <ErrorBoundary fallback={({retry}) => <button onClick={retry}>Custom retry</button>}>
        <Part broken />
      </ErrorBoundary>
      <button type="button" onClick={() => setBroken(false)}>
        Fix it
      </button>
      <button type="button" onClick={() => setKey(value => value + 1)}>
        New product
      </button>
      <span data-test="reported">{reported}</span>
    </div>
  );
}
