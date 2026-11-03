import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontJournalStories({stories}) {
  return (
    <>
      {stories.map((p, $index) => (
        <React.Fragment key={$index}>
          <DS.BlogCard
            layout="stack"
            frame="soft"
            aspect="4/3"
            title={p?.title}
            image={p?.image}
            excerpt={p?.excerpt}
            meta={p?.meta}
            href={p?.href}
          />
        </React.Fragment>
      ))}
    </>
  );
}
