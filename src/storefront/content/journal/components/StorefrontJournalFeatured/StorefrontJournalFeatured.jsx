import React from 'react';
import {BlogCard} from '../../../../../design-system/components/BlogCard/BlogCard.jsx';

export function StorefrontJournalFeatured({title, image, excerpt, meta, cta, href}) {
  return (
    <div className="vf-journal-featured tw:mb-8">
      <BlogCard
        layout="wide"
        frame="arch"
        priority={true}
        title={title}
        image={image}
        excerpt={excerpt}
        meta={meta}
        cta={cta}
        href={href}
      />
    </div>
  );
}
