// StorefrontSearch: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontSearchLayout} from '../app/layouts/StorefrontSearchLayout/StorefrontSearchLayout.jsx';
import {StorefrontSearchHeading} from '../app/organisms/StorefrontSearchHeading/StorefrontSearchHeading.jsx';
import {StorefrontSearchControls} from '../app/organisms/StorefrontSearchControls/StorefrontSearchControls.jsx';
import {StorefrontSearchPopular} from '../app/organisms/StorefrontSearchPopular/StorefrontSearchPopular.jsx';
import {StorefrontSearchResults} from '../app/organisms/StorefrontSearchResults/StorefrontSearchResults.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontSearchLayout
            heading={<StorefrontSearchHeading title={v.t?.label} />}
            controls={
              <StorefrontSearchControls
                query={{
                  label: v.t?.label,
                  placeholder: v.t?.ph,
                  value: v.q,
                  onChange: v.setQ
                }}
                close={{label: v.t?.close, href: v.closeHref}}
              />
            }
            popular={
              v.empty ? (
                <StorefrontSearchPopular title={v.t?.popular} terms={list(v.popular)} />
              ) : null
            }
            results={
              v.hasResults ? (
                <StorefrontSearchResults countLabel={v.countLabel} results={list(v.results)} />
              ) : null
            }
            empty={
              v.noResults ? (
                <>
                  <div role="status">
                    <>{v.countLabel}</>
                  </div>
                  <div className="tw:flex tw:flex-col tw:items-center tw:gap-4">
                    <DS.EmptyState
                      icon="search-x"
                      title={v.t?.noneA}
                      titleAccent={v.t?.noneB}
                      body={v.t?.noneP}
                    />
                    <div className="tw:flex tw:gap-3 tw:flex-wrap">
                      <DS.Button variant="primary" onClick={v.clearSearch}>
                        <>{v.t?.tryAgain}</>
                      </DS.Button>
                      <DS.Button variant="secondary" href={v.href?.shop}>
                        <>{v.t?.browse}</>
                      </DS.Button>
                    </div>
                  </div>
                </>
              ) : null
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
