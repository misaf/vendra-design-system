// StorefrontNotfound: the page inside the storefront shell.
import React from 'react';
import {EmptyState} from '../../../design-system/components/EmptyState/EmptyState.jsx';
import {SectionHeader} from '../../../design-system/components/SectionHeader/SectionHeader.jsx';
import {asList} from '../ui/as-list.js';
import {StorefrontNotfoundLayout} from './_components/StorefrontNotfoundLayout/StorefrontNotfoundLayout.jsx';
import {StorefrontNotfoundActions} from './_components/StorefrontNotfoundActions/StorefrontNotfoundActions.jsx';
import {StorefrontNotfoundProducts} from './_components/StorefrontNotfoundProducts/StorefrontNotfoundProducts.jsx';
import {Shell} from '../components/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontNotfoundLayout
          message={
            <EmptyState
              icon="flower-2"
              eyebrow={v.t?.code}
              title={v.t?.hA}
              titleAccent={v.t?.hB}
              body={v.t?.hP}
              headingLevel={1}
            />
          }
          actions={
            <StorefrontNotfoundActions
              homeLabel={v.t?.home}
              homeHref={v.href?.home}
              searchLabel={v.t?.search}
              searchHref={v.href?.search}
            />
          }
          recommendationHeading={<SectionHeader title={v.t?.popA} accent={v.t?.popB} />}
          recommendations={
            <StorefrontNotfoundProducts
              products={asList(v.items)}
              photoLabel={v.t?.photo}
              saveLabel={v.t?.save}
            />
          }
        />
      }
      sticky={<></>}
    />
  );
}
