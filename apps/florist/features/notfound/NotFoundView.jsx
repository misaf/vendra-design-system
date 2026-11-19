// StorefrontNotfound: the page inside the storefront shell.
import React from 'react';
import * as DS from '../../shell/ds.js';
import {asList} from '../../shared/ui/as-list.js';
import {StorefrontNotfoundLayout} from './layouts/StorefrontNotfoundLayout/StorefrontNotfoundLayout.jsx';
import {StorefrontNotfoundActions} from './molecules/StorefrontNotfoundActions/StorefrontNotfoundActions.jsx';
import {StorefrontNotfoundProducts} from './organisms/StorefrontNotfoundProducts/StorefrontNotfoundProducts.jsx';
import {Shell} from '../../shell/Shell.jsx';

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
