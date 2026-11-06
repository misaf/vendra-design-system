import React from 'react';
import {BlogCard} from './BlogCard.jsx';

export function Fixture() {
  const [opened, setOpened] = React.useState('');
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 280px)', gap: 24}}>
      <BlogCard
        image="/assets/placeholder.svg"
        date="24 Sep 2026"
        title="A morning at the Vendra workbench"
        excerpt="Buckets arrive at seven."
        href="#morning"
        cta="Read"
      />
      <BlogCard title="Five small habits" headingLevel={2} onClick={() => setOpened('habits')} />
      <output data-test="opened">{opened}</output>
    </div>
  );
}
