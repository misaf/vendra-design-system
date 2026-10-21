// StorefrontNotfound: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontNotfoundLayout} from '../app/layouts/StorefrontNotfoundLayout/StorefrontNotfoundLayout.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontNotfoundLayout
            message={
              <>
                <DS.EmptyState
                  icon="flower-2"
                  eyebrow={v.t?.code}
                  title={v.t?.hA}
                  titleAccent={v.t?.hB}
                  body={v.t?.hP}
                  headingLevel={1}
                />
              </>
            }
            actions={
              <>
                <DS.Button variant="primary" iconStart="house" href={v.href?.home}>
                  <>{v.t?.home}</>
                </DS.Button>
                <DS.Button variant="secondary" iconStart="search" href={v.href?.search}>
                  <>{v.t?.search}</>
                </DS.Button>
              </>
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
