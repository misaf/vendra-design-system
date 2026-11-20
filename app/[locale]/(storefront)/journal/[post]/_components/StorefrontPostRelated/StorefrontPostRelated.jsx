import React from 'react';
import {BlogCard} from '../../../../../../../ui/components/BlogCard/BlogCard.jsx';
import {SectionHeader} from '../../../../../../../ui/components/SectionHeader/SectionHeader.jsx';

export function StorefrontPostRelated({title, accent, stories}) {
  return (
    <>
      <SectionHeader title={title} accent={accent} />
      <div className="vf-post-article-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))] tw:gap-y-7 tw:gap-x-5">
        {stories.map((r, $index) => (
          <React.Fragment key={$index}>
            <BlogCard
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
