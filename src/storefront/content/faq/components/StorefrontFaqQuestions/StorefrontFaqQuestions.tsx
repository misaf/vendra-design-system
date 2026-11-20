import React from 'react';
import type {ReactNode} from 'react';
import {Accordion} from '../../../../../design-system/components/Accordion/Accordion.jsx';
import type {AccordionItem} from '../../../../../design-system/components/Accordion/Accordion.js';

type QuestionGroup = {id: string; title: ReactNode; open?: string; items: AccordionItem[]};

export function StorefrontFaqQuestions({groups}: {groups: QuestionGroup[]}) {
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
            <Accordion items={group?.items} defaultValue={group?.open} headingLevel={3} />
          </section>
        </React.Fragment>
      ))}
    </>
  );
}
