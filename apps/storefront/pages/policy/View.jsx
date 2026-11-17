// StorefrontPolicy: the page inside the storefront shell.
import React from 'react';
import * as DS from '../../app/ds.js';
import {list} from '../../app/runtime.js';
import {StorefrontPolicyLayout} from '../../app/layouts/StorefrontPolicyLayout/StorefrontPolicyLayout.jsx';
import {StorefrontPolicyHeading} from '../../app/organisms/StorefrontPolicyHeading/StorefrontPolicyHeading.jsx';
import {StorefrontPolicyNavigation} from '../../app/organisms/StorefrontPolicyNavigation/StorefrontPolicyNavigation.jsx';
import {StorefrontPolicyContents} from '../../app/organisms/StorefrontPolicyContents/StorefrontPolicyContents.jsx';
import {StorefrontPolicyDocument} from '../../app/organisms/StorefrontPolicyDocument/StorefrontPolicyDocument.jsx';
import {Shell} from '../../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontPolicyLayout
          heading={
            <StorefrontPolicyHeading
              eyebrow={v.t?.eb}
              title={v.doc?.title}
              intro={v.doc?.intro}
              updatedLabel={v.t?.updatedL}
              updatedDate={v.doc?.updatedText}
              updatedIso={v.doc?.updatedIso}
            />
          }
          policyNavigation={
            <StorefrontPolicyNavigation label={v.t?.policiesL} links={list(v.policyLinks)} />
          }
          notice={
            <DS.Alert tone="warning" title={v.t?.sampleT}>
              {v.t?.sampleP}
            </DS.Alert>
          }
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
      }
      sticky={<></>}
    />
  );
}
