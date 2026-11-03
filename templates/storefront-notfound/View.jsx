// StorefrontNotfound: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontNotfoundLayout} from '../app/layouts/StorefrontNotfoundLayout/StorefrontNotfoundLayout.jsx';
import {StorefrontNotfoundMessage} from '../app/organisms/StorefrontNotfoundMessage/StorefrontNotfoundMessage.jsx';
import {StorefrontNotfoundActions} from '../app/organisms/StorefrontNotfoundActions/StorefrontNotfoundActions.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontNotfoundLayout
            message={
              <StorefrontNotfoundMessage
                eyebrow={v.t?.code}
                title={v.t?.hA}
                accent={v.t?.hB}
                body={v.t?.hP}
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
            recommendationHeading={
              <>
                <DS.SectionHeader title={v.t?.popA} accent={v.t?.popB} />
              </>
            }
            recommendations={
              <>
                {list(v.items).map((p, $index) => (
                  <React.Fragment key={$index}>
                    <DS.ProductCard
                      images={p?.images}
                      name={p?.name}
                      subtitle={p?.sub}
                      price={p?.price}
                      stock={p?.stock}
                      frame="soft"
                      placeholder={v.t?.photo}
                      favLabel={v.t?.save}
                      href={p?.href}
                    />
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
