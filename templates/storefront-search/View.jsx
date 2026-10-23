// StorefrontSearch: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontSearchLayout} from '../app/layouts/StorefrontSearchLayout/StorefrontSearchLayout.jsx';
import {StorefrontSearchHeading} from '../app/organisms/StorefrontSearchHeading/StorefrontSearchHeading.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontSearchLayout
            heading={<StorefrontSearchHeading title={v.t?.label} />}
            query={
              <DS.SearchField
                id="vf-q"
                label={v.t?.label}
                placeholder={v.t?.ph}
                value={v.q}
                onChange={v.setQ}
              />
            }
            close={
              <DS.IconButton
                icon="x"
                label={v.t?.close}
                variant="secondary"
                className="tw:flex-none"
                href={v.closeHref}
              />
            }
            popular={
              v.empty ? (
                <>
                  <div className="tw:flex tw:flex-col tw:gap-3">
                    <div className="vf-search-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
                      <>{v.t?.popular}</>
                    </div>
                    <div className="tw:flex tw:gap-2 tw:flex-wrap">
                      {list(v.popular).map((p, $index) => (
                        <React.Fragment key={$index}>
                          <DS.Chip onClick={p?.pick}>
                            <>{p?.label}</>
                          </DS.Chip>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </>
              ) : null
            }
            results={
              v.hasResults ? (
                <>
                  <div className="vf-search-results tw:flex tw:flex-col">
                    <div
                      role="status"
                      className="vf-search-result-count tw:text-sm tw:text-quiet tw:mb-2"
                    >
                      <>{v.countLabel}</>
                    </div>
                    {list(v.results).map((r, $index) => (
                      <React.Fragment key={$index}>
                        <a
                          href={r?.href}
                          className="vf-search-result vf-search-row tw:grid tw:[grid-template-columns:48px_minmax(0,1fr)_auto] tw:gap-4 tw:items-center tw:py-3 tw:px-0 tw:[border-top:1px_solid_var(--border-subtle)] tw:text-body! tw:no-underline! tw:hover:bg-sunken"
                        >
                          <div className="vf-search-thumbnail tw:w-12 tw:flex-none">
                            <DS.ArchFrame
                              src={r?.image}
                              sizes="48px"
                              shape="soft"
                              size="thumb"
                              tone="product"
                              alt={r?.image?.alt}
                            />
                          </div>
                          <span className="vf-search-details tw:flex-1 tw:min-w-0 tw:flex tw:flex-col tw:gap-1">
                            <bdi dir="ltr" className="vf-search-name tw:font-medium">
                              <>{r?.name}</>
                            </bdi>
                            <span className="vf-search-subtitle tw:text-sm tw:text-quiet">
                              <>{r?.sub}</>
                            </span>
                          </span>
                          <DS.Price value={r?.price} size="md" className="vf-price" />
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                </>
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
