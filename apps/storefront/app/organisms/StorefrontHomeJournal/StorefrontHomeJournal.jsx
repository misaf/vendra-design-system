import React from 'react';
import * as DS from '../../ds.js';
import {CollectionCarousel} from '../../../_shared/collection-carousel.jsx';

export function StorefrontHomeJournal({posts, labels, journalHref}) {
  return (
    <>
      <DS.SectionHeader
        id="vf-home-journal-title"
        eyebrow={labels.eyebrow}
        title={labels.title}
        accent={labels.accent}
        action={
          <DS.Button variant="ghost" iconEnd="arrow-right" href={journalHref}>
            <>{labels.all}</>
          </DS.Button>
        }
      />
      <p className="tw:m-0 tw:text-secondary tw:max-w-measure">{labels.description}</p>
      <CollectionCarousel
        total={posts.length}
        countLabel={labels.count}
        className="vf-home-journal-row vf-home-carousel"
        label={labels.region}
        perView={3}
        perViewMobile={1.15}
        itemMin="240px"
        gap="20px"
        arrows={true}
        prevLabel={labels.previous}
        nextLabel={labels.next}
      >
        {posts.map((post, $index) => (
          <React.Fragment key={$index}>
            <DS.BlogCard
              layout="stack"
              frame="soft"
              aspect="4/3"
              headingLevel={3}
              title={post?.title}
              image={post?.image}
              excerpt={post?.excerpt}
              meta={post?.meta}
              href={post?.href}
            />
          </React.Fragment>
        ))}
      </CollectionCarousel>
    </>
  );
}
