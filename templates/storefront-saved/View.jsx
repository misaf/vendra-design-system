// StorefrontSaved: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main id="main" tabIndex={-1} className="vf-shopping tw:mx-auto">
            <div className="vf-saved-header tw:mb-6">
              <DS.SectionHeader
                level="h1"
                eyebrow={v.countLabel}
                title={v.t?.hA}
                accent={v.t?.hB}
              />
            </div>
            {v.hasItems ? (
              <>
                <div className="vf-saved-product-grid vf-product-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(max(150px,calc((100%_-_72px)_/_4)),1fr))] tw:gap-y-7 tw:gap-x-5">
                  {list(v.items).map((p, $index) => (
                    <React.Fragment key={$index}>
                      <DS.ProductCard
                        images={p?.images}
                        name={p?.name}
                        code={p?.code}
                        subtitle={p?.sub}
                        price={p?.price}
                        stock={p?.stock}
                        badge={p?.badge}
                        badgeTone="accent"
                        frame="soft"
                        placeholder={v.t?.photo}
                        favLabel={v.t?.unsave}
                        favorite={true}
                        onFavorite={p?.remove}
                        href={p?.href}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </>
            ) : null}
            {v.noItems ? (
              <>
                <div className="vf-saved-empty tw:flex tw:flex-col tw:items-center tw:gap-4h tw:py-6 tw:px-0">
                  <DS.EmptyState
                    icon="heart"
                    title={v.t?.emptyA}
                    titleAccent={v.t?.emptyB}
                    body={v.t?.emptyP}
                  />
                  <DS.Button variant="primary" href={v.href?.shop}>
                    <>{v.t?.browse}</>
                  </DS.Button>
                </div>
              </>
            ) : null}
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
