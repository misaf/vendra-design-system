import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontAccountSaved({showItems, showEmpty, items, labels, shopHref}) {
  return (
    <>
      {showItems ? (
        <>
          <div className="vf-account-saved-grid vf-product-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(max(150px,calc((100%_-_72px)_/_4)),1fr))] tw:gap-y-7 tw:gap-x-5">
            {items.map((p, $index) => (
              <React.Fragment key={$index}>
                <DS.ProductCard
                  images={p?.images}
                  name={p?.name}
                  subtitle={p?.sub}
                  price={p?.price}
                  stock={p?.stock}
                  badge={p?.badge}
                  badgeTone="accent"
                  frame="soft"
                  placeholder={labels.photo}
                  favLabel={labels.remove}
                  favorite={true}
                  onFavorite={p?.remove}
                  href={p?.href}
                />
              </React.Fragment>
            ))}
          </div>
        </>
      ) : null}
      {showEmpty ? (
        <>
          <div className="vf-account-saved-empty tw:flex tw:flex-col tw:items-center tw:gap-4h tw:py-6 tw:px-0">
            <DS.EmptyState
              icon="heart"
              title={labels.emptyTitle}
              titleAccent={labels.emptyAccent}
              body={labels.emptyBody}
            />
            <DS.Button variant="primary" href={shopHref}>
              <>{labels.browse}</>
            </DS.Button>
          </div>
        </>
      ) : null}
    </>
  );
}
