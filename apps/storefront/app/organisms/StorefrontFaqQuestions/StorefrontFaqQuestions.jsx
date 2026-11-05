import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontFaqQuestions({groups}) {
  return (
    <>
      {groups.map((group, $index) => (
        <React.Fragment key={$index}>
          <section
            className="vf-info-section tw:flex tw:flex-col tw:gap-4 tw:[scroll-margin-top:96px]"
            aria-labelledby={group?.id}
          >
            <h2 id={group?.id}>
              <>{group?.title}</>
            </h2>
            <DS.Accordion items={group?.items} defaultValue={group?.open} headingLevel={3} />
          </section>
        </React.Fragment>
      ))}
    </>
  );
}
