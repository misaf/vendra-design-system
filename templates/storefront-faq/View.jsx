// StorefrontFaq: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontFaqLayout} from '../app/layouts/StorefrontFaqLayout/StorefrontFaqLayout.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontFaqLayout
            heading={
              <>
                <div className="vf-info-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
                  <>{v.t?.eyebrow}</>
                </div>
                <h1>
                  <>{v.t?.titleA} </>
                  <em className="vf-faq-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                    <>{v.t?.titleB}</>
                  </em>
                </h1>
                <p className="vf-info-intro tw:m-0 tw:text-md tw:leading-body tw:text-secondary tw:text-pretty">
                  <>{v.t?.intro}</>
                </p>
              </>
            }
            questions={
              <>
                {list(v.groups).map((group, $index) => (
                  <React.Fragment key={$index}>
                    <section
                      className="vf-info-section tw:flex tw:flex-col tw:gap-4 tw:[scroll-margin-top:96px]"
                      aria-labelledby={group?.id}
                    >
                      <h2 id={group?.id}>
                        <>{group?.title}</>
                      </h2>
                      <DS.Accordion
                        items={group?.items}
                        defaultValue={group?.open}
                        headingLevel={3}
                      />
                    </section>
                  </React.Fragment>
                ))}
              </>
            }
            contact={
              <>
                <DS.Card padding={28}>
                  <div className="tw:flex tw:flex-col tw:gap-4">
                    <DS.Icon name="message-circle" size={28} />
                    <h2>
                      <>{v.t?.helpTitle}</>
                    </h2>
                    <p className="vf-faq-answer tw:m-0 tw:text-quiet tw:leading-body">
                      <>{v.t?.helpBody}</>
                    </p>
                    <div className="tw:flex tw:gap-3 tw:flex-wrap">
                      {v.waHref ? (
                        <DS.Button
                          variant="primary"
                          iconStart="message-circle"
                          href={v.waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <>{v.t?.whatsapp}</>
                        </DS.Button>
                      ) : null}
                      <DS.Button variant="ghost" href={v.href?.contact}>
                        <>{v.t?.contactUs}</>
                      </DS.Button>
                    </div>
                  </div>
                </DS.Card>
                <p className="vf-faq-note tw:m-0 tw:text-sm tw:leading-body tw:text-quiet">
                  <>{v.t?.sample}</>
                </p>
              </>
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
