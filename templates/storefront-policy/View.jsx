// StorefrontPolicy: the page inside the storefront shell.
import React from 'react';
import {list} from '../app/runtime.js';
import {StorefrontPolicyLayout} from '../app/layouts/StorefrontPolicyLayout/StorefrontPolicyLayout.jsx';
import {StorefrontPolicyHeading} from '../app/organisms/StorefrontPolicyHeading/StorefrontPolicyHeading.jsx';
import {StorefrontPolicyNavigation} from '../app/organisms/StorefrontPolicyNavigation/StorefrontPolicyNavigation.jsx';
import {StorefrontPolicyNotice} from '../app/organisms/StorefrontPolicyNotice/StorefrontPolicyNotice.jsx';
import {StorefrontPolicyContents} from '../app/organisms/StorefrontPolicyContents/StorefrontPolicyContents.jsx';
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
            notice={<StorefrontPolicyNotice title={v.t?.sampleT} body={v.t?.sampleP} />}
            tableOfContents={
              <StorefrontPolicyContents label={v.t?.toc} sections={list(v.doc?.sections)} />
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
