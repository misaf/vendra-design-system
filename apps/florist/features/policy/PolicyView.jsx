// StorefrontPolicy: the page inside the storefront shell.
import React from 'react';
import * as DS from '../../shell/ds.js';
import {list} from '../../shell/runtime.js';
import {StorefrontPolicyLayout} from './layouts/StorefrontPolicyLayout/StorefrontPolicyLayout.jsx';
import {StorefrontPageHeading} from '../../shell/molecules/StorefrontPageHeading/StorefrontPageHeading.jsx';
import {StorefrontPolicyNavigation} from './organisms/StorefrontPolicyNavigation/StorefrontPolicyNavigation.jsx';
import {StorefrontPolicyContents} from './organisms/StorefrontPolicyContents/StorefrontPolicyContents.jsx';
import {StorefrontPolicyDocument} from './organisms/StorefrontPolicyDocument/StorefrontPolicyDocument.jsx';
import {Shell} from '../../shell/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontPolicyLayout
          heading={
            <StorefrontPageHeading
              variant="info"
              eyebrow={v.t?.eb}
              title={v.doc?.title}
              intro={v.doc?.intro}
              meta={
                <>
                  {v.t?.updatedL} <time dateTime={v.doc?.updatedIso}>{v.doc?.updatedText}</time>
                </>
              }
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
