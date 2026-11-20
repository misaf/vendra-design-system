// StorefrontPolicy: the page inside the storefront shell.
import React from 'react';
import {Alert} from '../../../../ui/components/Alert/Alert.jsx';
import {asList} from '../../../../shared/ui/as-list.js';
import {StorefrontPolicyLayout} from './_components/StorefrontPolicyLayout/StorefrontPolicyLayout.jsx';
import {StorefrontPageHeading} from '../../../../components/storefront/StorefrontPageHeading/StorefrontPageHeading.jsx';
import {StorefrontPolicyNavigation} from './_components/StorefrontPolicyNavigation/StorefrontPolicyNavigation.jsx';
import {StorefrontPolicyContents} from './_components/StorefrontPolicyContents/StorefrontPolicyContents.jsx';
import {StorefrontPolicyDocument} from './_components/StorefrontPolicyDocument/StorefrontPolicyDocument.jsx';
import {Shell} from '../../../../components/storefront/Shell.jsx';

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
