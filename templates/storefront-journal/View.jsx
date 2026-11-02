// StorefrontJournal: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontJournalLayout} from '../app/layouts/StorefrontJournalLayout/StorefrontJournalLayout.jsx';
import {StorefrontJournalHeading} from '../app/organisms/StorefrontJournalHeading/StorefrontJournalHeading.jsx';
import {StorefrontJournalSearch} from '../app/organisms/StorefrontJournalSearch/StorefrontJournalSearch.jsx';
import {StorefrontJournalEmpty} from '../app/organisms/StorefrontJournalEmpty/StorefrontJournalEmpty.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontJournalLayout
            heading={
              <StorefrontJournalHeading
                eyebrow={v.t?.eb}
                title={v.t?.hA}
                accent={v.t?.hB}
                categoriesLabel={v.t?.categories}
                categories={list(v.cats)}
                onCategoryFocus={event => {
                  const target = /** @type {HTMLElement} */ (event.target);
                  if (target !== event.currentTarget)
                    target.scrollIntoView({block: 'nearest', inline: 'nearest'});
                }}
              />
            }
            search={
              <StorefrontJournalSearch label={v.migration?.search} value={v.q} onChange={v.setQ} />
            }
            feedback={
              <>
                {v.noStories ? (
                  <StorefrontJournalEmpty
                    title={v.migration?.empty}
                    clearLabel={v.migration?.clear}
                    onClear={v.clear}
                  />
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
