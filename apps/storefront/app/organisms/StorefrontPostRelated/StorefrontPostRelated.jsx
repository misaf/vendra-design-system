import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPostRelated({title, accent, stories}) {
  return (
    <>
      <DS.SectionHeader title={title} accent={accent} />
      <div className="vf-post-article-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))] tw:gap-y-7 tw:gap-x-5">
        {stories.map((r, $index) => (
          <React.Fragment key={$index}>
            <DS.BlogCard
              frame="soft"
              aspect="4/3"
              title={r?.title}
              image={r?.image}
              excerpt={r?.excerpt}
              meta={r?.meta}
              href={r?.href}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
