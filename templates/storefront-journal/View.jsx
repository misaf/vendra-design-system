// StorefrontJournal: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontJournalLayout} from '../app/layouts/StorefrontJournalLayout/StorefrontJournalLayout.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontJournalLayout
            heading={
              <>
                <DS.SectionHeader level="h1" eyebrow={v.t?.eb} title={v.t?.hA} accent={v.t?.hB} />
                <div
                  role="group"
                  aria-label={v.t?.categories}
                  className="vf-journal-categories tw:flex tw:gap-2 tw:flex-wrap"
                  onFocus={event => {
                    const target = /** @type {HTMLElement} */ (event.target);
                    if (target !== event.currentTarget)
                      target.scrollIntoView({block: 'nearest', inline: 'nearest'});
                  }}
                >
                  {list(v.cats).map((c, $index) => (
                    <React.Fragment key={$index}>
                      <DS.Chip selected={c?.on} aria-pressed={c?.on} onClick={c?.pick}>
                        <>{c?.label}</>
                      </DS.Chip>
                    </React.Fragment>
                  ))}
                </div>
              </>
            }
            search={
              <>
                <DS.SearchField label={v.migration?.search} value={v.q} onChange={v.setQ} />
              </>
            }
            feedback={
              <>
                {v.noStories ? (
                  <>
                    <DS.EmptyState title={v.migration?.empty} headingLevel={2} />
                    <DS.Button onClick={v.clear}>
                      <>{v.migration?.clear}</>
                    </DS.Button>
                  </>
                ) : null}
                {v.loading ? (
                  <>
                    <DS.Skeleton shape="card" />
                    <p role="status">
                      <>{v.migration?.loading}</>
                    </p>
                  </>
                ) : null}
              </>
            }
            featured={
              <>
                {v.hasLead ? (
                  <>
                    <div className="vf-journal-featured tw:mb-8">
                      <DS.BlogCard
                        layout="wide"
                        frame="arch"
                        priority={true}
                        title={v.lead?.title}
                        image={v.lead?.image}
                        excerpt={v.lead?.excerpt}
                        meta={v.lead?.meta}
                        cta={v.t?.read}
                        href={v.lead?.href}
                      />
                    </div>
                  </>
                ) : null}
              </>
            }
            stories={
              <>
                {list(v.rest).map((p, $index) => (
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
            }
            pagination={
              <>
                <DS.Pagination
                  className="vf-journal-pagination tw:mt-8"
                  page={v.paging?.page}
                  pageCount={v.paging?.pageCount}
                  href={v.paging?.href}
                  onChange={v.paging?.onChange}
                />
              </>
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
