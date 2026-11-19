import React from 'react';
import {SectionHeader} from './SectionHeader.jsx';

export function Fixture() {
  const [index, setIndex] = React.useState(0);
  return (
    <div style={{display: 'grid', gap: 24}}>
      <SectionHeader level="h1" eyebrow="This week" title="New" accent="arrivals" />
      <SectionHeader
        title="Occasions"
        onPrev={() => setIndex(index - 1)}
        onNext={() => setIndex(index + 1)}
        canPrev={index > 0}
        canNext={index < 2}
        action={<a href="#all">See all</a>}
      />
      <output data-test="index">{index}</output>
    </div>
  );
}
