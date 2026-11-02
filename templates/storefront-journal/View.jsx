// StorefrontJournal: the page inside the storefront shell.
import React from 'react';
import {list} from '../app/runtime.js';
import {StorefrontJournalLayout} from '../app/layouts/StorefrontJournalLayout/StorefrontJournalLayout.jsx';
import {StorefrontJournalHeading} from '../app/organisms/StorefrontJournalHeading/StorefrontJournalHeading.jsx';
import {StorefrontJournalSearch} from '../app/organisms/StorefrontJournalSearch/StorefrontJournalSearch.jsx';
import {StorefrontJournalEmpty} from '../app/organisms/StorefrontJournalEmpty/StorefrontJournalEmpty.jsx';
import {StorefrontJournalLoading} from '../app/organisms/StorefrontJournalLoading/StorefrontJournalLoading.jsx';
import {StorefrontJournalFeatured} from '../app/organisms/StorefrontJournalFeatured/StorefrontJournalFeatured.jsx';
import {StorefrontJournalStories} from '../app/organisms/StorefrontJournalStories/StorefrontJournalStories.jsx';
import {StorefrontJournalPagination} from '../app/organisms/StorefrontJournalPagination/StorefrontJournalPagination.jsx';
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
                {v.loading ? <StorefrontJournalLoading message={v.migration?.loading} /> : null}
              </>
            }
            featured={
              <>
                {v.hasLead ? (
                  <>
                    <StorefrontJournalFeatured
                      title={v.lead?.title}
                      image={v.lead?.image}
                      excerpt={v.lead?.excerpt}
                      meta={v.lead?.meta}
                      cta={v.t?.read}
                      href={v.lead?.href}
                    />
                  </>
                ) : null}
              </>
            }
            stories={<StorefrontJournalStories stories={list(v.rest)} />}
            pagination={
              <StorefrontJournalPagination
                page={v.paging?.page}
                pageCount={v.paging?.pageCount}
                href={v.paging?.href}
                onChange={v.paging?.onChange}
              />
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
