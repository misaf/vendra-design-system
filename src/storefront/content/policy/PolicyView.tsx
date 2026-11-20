// StorefrontPolicy: the page inside the storefront shell.
import React from 'react';
import {Alert} from '../../../design-system/components/Alert/Alert.jsx';
import {asList} from '../../shell/ui/as-list.js';
import {StorefrontPolicyLayout} from './components/StorefrontPolicyLayout/StorefrontPolicyLayout';
import {StorefrontPageHeading} from '../../shell/components/StorefrontPageHeading/StorefrontPageHeading';
import {StorefrontPolicyNavigation} from './components/StorefrontPolicyNavigation/StorefrontPolicyNavigation';
import {StorefrontPolicyContents} from './components/StorefrontPolicyContents/StorefrontPolicyContents';
import {StorefrontPolicyDocument} from './components/StorefrontPolicyDocument/StorefrontPolicyDocument';
import {Shell} from '../../shell/components/Shell.jsx';

import type {usePolicy} from './usePolicy.js';

export function View({v}: {v: ReturnType<typeof usePolicy>}) {
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
            <Alert tone="warning" title={v.t?.sampleT}>
              {v.t?.sampleP}
            </Alert>
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
