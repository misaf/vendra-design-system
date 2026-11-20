// StorefrontJournal: the page inside the storefront shell.
import React from 'react';
import {Pagination} from '../../../design-system/components/Pagination/Pagination.jsx';
import {SearchField} from '../../../design-system/components/SearchField/SearchField.jsx';
import {asList} from '../../shell/ui/as-list.js';
import {StorefrontJournalLayout} from './components/StorefrontJournalLayout/StorefrontJournalLayout.jsx';
import {StorefrontJournalHeading} from './components/StorefrontJournalHeading/StorefrontJournalHeading.jsx';
import {StorefrontJournalEmpty} from './components/StorefrontJournalEmpty/StorefrontJournalEmpty.jsx';
import {StorefrontJournalLoading} from './components/StorefrontJournalLoading/StorefrontJournalLoading.jsx';
import {StorefrontJournalFeatured} from './components/StorefrontJournalFeatured/StorefrontJournalFeatured.jsx';
import {StorefrontJournalStories} from './components/StorefrontJournalStories/StorefrontJournalStories.jsx';
import {Shell} from '../../shell/components/Shell.jsx';

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
