// StorefrontJournal: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main id="main" tabIndex={-1} className="vf-info tw:mx-auto">
            <div className="vf-journal-header tw:flex tw:flex-col tw:gap-4h tw:mb-7">
              <DS.SectionHeader level="h1" eyebrow={v.t?.eb} title={v.t?.hA} accent={v.t?.hB} />
              <div className="tw:flex tw:gap-2 tw:flex-wrap">
                {list(v.cats).map((c, $index) => (
                  <React.Fragment key={$index}>
                    <DS.Chip selected={c?.on} aria-pressed={c?.on} onClick={c?.pick}>
                      <>{c?.label}</>
                    </DS.Chip>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="tw:mb-5">
              <DS.SearchField label={v.migration?.search} value={v.q} onChange={v.setQ} />
            </div>
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
            {v.hasLead ? (
              <>
                <div className="vf-journal-featured tw:mb-8">
                  <DS.BlogCard
                    layout={v.leadLayout}
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
            <div className="vf-journal-article-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))] tw:gap-y-7 tw:gap-x-5">
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
            </div>
            <DS.Pagination
              className="tw:mt-8"
              page={v.paging?.page}
              pageCount={v.paging?.pageCount}
              href={v.paging?.href}
              onChange={v.paging?.onChange}
            />
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
