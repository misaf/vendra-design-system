// StorefrontSearch: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main
            id="main"
            tabIndex="-1"
            className="vf-shopping tw:mx-auto tw:flex tw:flex-col tw:gap-5"
          >
            <div className="vf-reading tw:max-w-[760px] tw:mx-auto">
              <h1 className="ag-display">
                <>{v.t?.label}</>
              </h1>
              <div className="vf-search-controls tw:flex tw:gap-3 tw:items-end">
                <div className="vf-search-input tw:flex-1">
                  <DS.Input
                    id="vf-q"
                    type="search"
                    iconStart="search"
                    label={v.t?.label}
                    placeholder={v.t?.ph}
                    value={v.q}
                    onChange={v.setQ}
                  />
                </div>
                <DS.IconButton
                  icon="x"
                  label={v.t?.close}
                  variant="outline"
                  href={v.href?.home}
                  onClick={v.go?.home}
                />
              </div>
              {v.empty ? (
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
              ) : null}
              {v.hasResults ? (
                <>
                  <div className="tw:flex tw:flex-col">
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
                          onClick={r?.go}
                          className="vf-search-result vf-search-row tw:grid tw:[grid-template-columns:48px_minmax(0,1fr)_auto] tw:gap-4 tw:items-center tw:py-3 tw:px-0 tw:[border-top:1px_solid_var(--border-subtle)] tw:text-body! tw:no-underline! tw:hover:bg-sunken"
                        >
                          <div className="vf-search-thumbnail tw:w-7 tw:flex-none">
                            <DS.ArchFrame
                              src={r?.image?.src}
                              shape="soft"
                              size="thumb"
                              tone="product"
                              alt={r?.image?.alt}
                            />
                          </div>
                          <span className="vf-search-details tw:flex-1 tw:min-w-0 tw:flex tw:flex-col tw:gap-1">
                            <span className="vf-search-name tw:font-medium">
                              <>{r?.name}</>
                            </span>
                            <span className="vf-search-subtitle tw:text-sm tw:text-quiet">
                              <>{r?.sub}</>
                            </span>
                          </span>
                          <span className="vf-price">
                            <>{r?.price}</>
                          </span>
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              {v.noResults ? (
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
                      <DS.Button variant="secondary" href={v.href?.shop} onClick={v.go?.shop}>
                        <>{v.t?.browse}</>
                      </DS.Button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
