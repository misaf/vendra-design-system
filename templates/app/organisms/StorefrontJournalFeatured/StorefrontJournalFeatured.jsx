import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontJournalFeatured({title, image, excerpt, meta, cta, href}) {
  return (
    <div className="vf-journal-featured tw:mb-8">
      <DS.BlogCard
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
