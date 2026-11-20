import React from 'react';
import {BlogCard} from '../../../../../design-system/components/BlogCard/BlogCard.jsx';

export function StorefrontJournalStories({stories}) {
  return (
    <>
      {stories.map((p, $index) => (
        <React.Fragment key={$index}>
          <BlogCard
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
