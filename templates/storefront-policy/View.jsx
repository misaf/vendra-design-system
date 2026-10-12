// StorefrontPolicy: the page inside the storefront shell.
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
          <main id="main" tabIndex="-1" className="vf-info">
            <header className="vf-info-header tw:max-w-[680px] tw:flex tw:flex-col tw:gap-4 tw:mb-7">
              <div className="vf-info-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
                <>{v.t?.eb}</>
              </div>
              <h1>
                <>{v.doc?.title}</>
              </h1>
              <p className="vf-info-intro tw:m-0 tw:text-md tw:leading-body tw:text-secondary tw:text-pretty">
                <>{v.doc?.intro}</>
              </p>
              <div className="vf-info-meta tw:text-sm tw:text-quiet">
                <>{v.t?.updated}</>
              </div>
            </header>
            <nav aria-label={v.t?.policiesL} className="vf-policy-switch tw:mb-7">
              <ul className="tw:flex tw:flex-wrap tw:gap-2 tw:m-0 tw:p-0 tw:list-none">
                {list(v.policyLinks).map((p, $index) => (
                  <React.Fragment key={$index}>
                    <li>
                      <a
                        href={p?.href}
                        aria-current={p?.current}
                        className="vf-policy-switch-link tw:min-h-tap tw:whitespace-nowrap tw:inline-flex tw:items-center tw:px-4 tw:rounded-full tw:border tw:border-solid tw:border-input tw:text-sm tw:text-body! tw:no-underline! tw:hover:border-body tw:aria-[current=page]:bg-inverse tw:aria-[current=page]:border-inverse tw:aria-[current=page]:text-on-inverse!"
                      >
                        <>{p?.label}</>
                      </a>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </nav>
            <div className="vf-info-notice tw:mb-7">
              <DS.Alert tone="warning" title={v.t?.sampleT}>
                <>{v.t?.sampleP}</>
              </DS.Alert>
            </div>
            <div className="vf-info-columns vf-info-columns--policy tw:grid tw:[grid-template-columns:240px_minmax(0,1fr)] tw:gap-7 tw:items-start">
              <nav
                aria-label={v.t?.toc}
                className="vf-info-toc tw:sticky tw:top-9 tw:flex tw:flex-col tw:gap-1"
              >
                <div className="vf-info-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
                  <>{v.t?.toc}</>
                </div>
                {list(v.doc?.sections).map((s, $index) => (
                  <React.Fragment key={$index}>
                    <a
                      href={s?.href}
                      className="vf-policy-toc-link tw:min-h-tap tw:flex tw:items-center tw:text-sm tw:text-body! tw:no-underline! tw:hover:text-accent"
                    >
                      <>{s?.title}</>
                    </a>
                  </React.Fragment>
                ))}
              </nav>
              <div className="vf-info-sections tw:flex tw:flex-col tw:gap-7 tw:min-w-0">
                {list(v.doc?.sections).map((s, $index) => (
                  <React.Fragment key={$index}>
                    <section
                      id={s?.id}
                      className="vf-info-section tw:flex tw:flex-col tw:gap-4 tw:[scroll-margin-top:96px]"
                    >
                      <h2>
                        <>{s?.title}</>
                      </h2>
                      {list(s?.paras).map((para, $index) => (
                        <React.Fragment key={$index}>
                          <p className="vf-info-copy tw:m-0 tw:text-md tw:leading-body tw:text-secondary tw:text-pretty">
                            <>{para?.text}</>
                          </p>
                        </React.Fragment>
                      ))}
                      {s?.hasItems ? (
                        <>
                          <ul className="vf-policy-list tw:m-0 tw:ps-5 tw:flex tw:flex-col tw:gap-2 tw:text-md tw:leading-body tw:text-secondary">
                            {list(s?.items).map((item, $index) => (
                              <React.Fragment key={$index}>
                                <li>
                                  <>{item?.text}</>
                                </li>
                              </React.Fragment>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </section>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
