// StorefrontPolicy: the page inside the storefront shell.
import React from 'react';
import * as DS from '../../shell/ds.js';
import {asList} from '../../shared/ui/as-list.js';
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
            <StorefrontPolicyNavigation label={v.t?.policiesL} links={asList(v.policyLinks)} />
          }
          notice={
            <DS.Alert tone="warning" title={v.t?.sampleT}>
              {v.t?.sampleP}
            </DS.Alert>
          }
          tableOfContents={
            <StorefrontPolicyContents label={v.t?.toc} sections={asList(v.doc?.sections)} />
          }
          document={
            <StorefrontPolicyDocument
              sections={asList(v.doc?.sections).map(s => ({
                id: s?.id,
                title: s?.title,
                paras: asList(s?.paras),
                hasItems: s?.hasItems,
                items: asList(s?.items)
              }))}
            />
          }
        />
      }
      sticky={<></>}
    />
  );
}
