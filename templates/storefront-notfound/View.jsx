// StorefrontNotfound: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main id="main" tabIndex="-1" className="vf-shopping tw:mx-auto">
            <div className="vf-notfound-message tw:mx-auto tw:flex tw:flex-col tw:items-center tw:max-w-[600px] tw:gap-4h">
              <DS.EmptyState
                icon="flower-2"
                eyebrow={v.t?.code}
                title={v.t?.hA}
                titleAccent={v.t?.hB}
                body={v.t?.hP}
                headingLevel={1}
              />
              <div className="tw:flex tw:gap-3 tw:flex-wrap tw:justify-center">
                <DS.Button
                  variant="primary"
                  iconStart="house"
                  href={v.href?.home}
                  onClick={v.go?.home}
                >
                  <>{v.t?.home}</>
                </DS.Button>
                <DS.Button
                  variant="secondary"
                  iconStart="search"
                  href={v.href?.search}
                  onClick={v.go?.search}
                >
                  <>{v.t?.search}</>
                </DS.Button>
              </div>
            </div>
            <section className="vf-notfound-recommendations tw:flex tw:flex-col tw:mt-9 tw:gap-5h">
              <DS.SectionHeader title={v.t?.popA} accent={v.t?.popB} />
              <div className="vf-notfound-product-grid vf-product-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(max(150px,calc((100%_-_72px)_/_4)),1fr))] tw:gap-y-7 tw:gap-x-5">
                {list(v.items).map((p, $index) => (
                  <React.Fragment key={$index}>
                    <DS.ProductCard
                      images={p?.images}
                      name={p?.name}
                      subtitle={p?.sub}
                      price={p?.price}
                      frame="soft"
                      placeholder={v.t?.photo}
                      favLabel={v.t?.save}
                      href={p?.href}
                      onClick={p?.go}
                    />
                  </React.Fragment>
                ))}
              </div>
            </section>
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
