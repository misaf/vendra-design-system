// StorefrontPolicy: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontPolicyLayout} from '../app/layouts/StorefrontPolicyLayout/StorefrontPolicyLayout.jsx';
import {StorefrontPolicyHeading} from '../app/organisms/StorefrontPolicyHeading/StorefrontPolicyHeading.jsx';
import {StorefrontPolicyNavigation} from '../app/organisms/StorefrontPolicyNavigation/StorefrontPolicyNavigation.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontPolicyLayout
            heading={
              <StorefrontPolicyHeading
                eyebrow={v.t?.eb}
                title={v.doc?.title}
                intro={v.doc?.intro}
                updated={v.t?.updated}
              />
            }
            policyNavigation={
              <StorefrontPolicyNavigation label={v.t?.policiesL} links={list(v.policyLinks)} />
            }
            notice={
              <>
                <DS.Alert tone="warning" title={v.t?.sampleT}>
                  <>{v.t?.sampleP}</>
                </DS.Alert>
              </>
            }
            tableOfContents={
              <>
                <nav
                  aria-label={v.t?.toc}
                  className="vf-info-toc vf-sticky-panel tw:flex tw:flex-col tw:gap-1"
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
              </>
            }
            document={
              <>
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
              </>
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
