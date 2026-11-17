// StorefrontNotfound: the page inside the storefront shell.
import React from 'react';
import * as DS from '../../app/ds.js';
import {list} from '../../app/runtime.js';
import {StorefrontNotfoundLayout} from '../../app/layouts/StorefrontNotfoundLayout/StorefrontNotfoundLayout.jsx';
import {StorefrontNotfoundActions} from '../../app/molecules/StorefrontNotfoundActions/StorefrontNotfoundActions.jsx';
import {StorefrontNotfoundProducts} from '../../app/organisms/StorefrontNotfoundProducts/StorefrontNotfoundProducts.jsx';
import {Shell} from '../../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontNotfoundLayout
          message={
            <DS.EmptyState
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
          recommendationHeading={<DS.SectionHeader title={v.t?.popA} accent={v.t?.popB} />}
          recommendations={
            <StorefrontNotfoundProducts
              products={list(v.items)}
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
