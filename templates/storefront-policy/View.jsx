// StorefrontPolicy: the page inside the storefront shell.
import React from 'react';
import {list} from '../app/runtime.js';
import {StorefrontPolicyLayout} from '../app/layouts/StorefrontPolicyLayout/StorefrontPolicyLayout.jsx';
import {StorefrontPolicyHeading} from '../app/organisms/StorefrontPolicyHeading/StorefrontPolicyHeading.jsx';
import {StorefrontPolicyNavigation} from '../app/organisms/StorefrontPolicyNavigation/StorefrontPolicyNavigation.jsx';
import {StorefrontPolicyNotice} from '../app/organisms/StorefrontPolicyNotice/StorefrontPolicyNotice.jsx';
import {StorefrontPolicyContents} from '../app/organisms/StorefrontPolicyContents/StorefrontPolicyContents.jsx';
import {StorefrontPolicyDocument} from '../app/organisms/StorefrontPolicyDocument/StorefrontPolicyDocument.jsx';
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
              <StorefrontPolicyDocument
                sections={list(v.doc?.sections).map(s => ({
                  id: s?.id,
                  title: s?.title,
                  paras: list(s?.paras),
                  hasItems: s?.hasItems,
                  items: list(s?.items)
                }))}
              />
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
