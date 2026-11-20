// StorefrontJournal: the page inside the storefront shell.
import React from 'react';
import {Pagination} from '../../../../components/ui/patterns/molecules/Pagination/Pagination.jsx';
import {SearchField} from '../../../../components/ui/patterns/molecules/SearchField/SearchField.jsx';
import {asList} from '../../../../shared/ui/as-list.js';
import {StorefrontJournalLayout} from './_components/StorefrontJournalLayout/StorefrontJournalLayout.jsx';
import {StorefrontJournalHeading} from './_components/StorefrontJournalHeading/StorefrontJournalHeading.jsx';
import {StorefrontJournalEmpty} from './_components/StorefrontJournalEmpty/StorefrontJournalEmpty.jsx';
import {StorefrontJournalLoading} from './_components/StorefrontJournalLoading/StorefrontJournalLoading.jsx';
import {StorefrontJournalFeatured} from './_components/StorefrontJournalFeatured/StorefrontJournalFeatured.jsx';
import {StorefrontJournalStories} from './_components/StorefrontJournalStories/StorefrontJournalStories.jsx';
import {Shell} from '../../../../components/storefront/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontJournalLayout
          heading={
            <StorefrontJournalHeading
              eyebrow={v.t?.eb}
              title={v.t?.hA}
              accent={v.t?.hB}
              categoriesLabel={v.t?.categories}
              categories={asList(v.cats)}
              onCategoryFocus={event => {
                const target = /** @type {HTMLElement} */ (event.target);
                if (target !== event.currentTarget)
                  target.scrollIntoView({block: 'nearest', inline: 'nearest'});
              }}
            />
          }
          search={<SearchField label={v.migration?.search} value={v.q} onChange={v.setQ} />}
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
            v.hasLead ? (
              <StorefrontJournalFeatured
                title={v.lead?.title}
                image={v.lead?.image}
                excerpt={v.lead?.excerpt}
                meta={v.lead?.meta}
                cta={v.t?.read}
                href={v.lead?.href}
              />
            ) : null
          }
          stories={<StorefrontJournalStories stories={asList(v.rest)} />}
          pagination={
            <Pagination
              className="vf-journal-pagination tw:mt-8"
              page={v.paging?.page}
              pageCount={v.paging?.pageCount}
              href={v.paging?.href}
              onChange={v.paging?.onChange}
            />
          }
        />
      }
      sticky={<></>}
    />
  );
}
