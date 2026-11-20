import React from 'react';
import {Alert} from '../../../../../design-system/components/Alert/Alert.jsx';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {EmptyState} from '../../../../../design-system/components/EmptyState/EmptyState.jsx';
import {LoadMore} from '../../../../../design-system/components/LoadMore/LoadMore.jsx';
import {ProductCard} from '../../../../../design-system/components/ProductCard/ProductCard.jsx';
import {Skeleton} from '../../../../../design-system/components/Skeleton/Skeleton.jsx';

export function StorefrontShopResults({
  products,
  frame,
  hasItems,
  showPaging,
  paging,
  feedback,
  labels
}) {
  return (
    <>
      {feedback.loading ? (
        <>
          <Skeleton shape="card" lines={3} />
          <p role="status">
            <>{labels.loading}</>
          </p>
        </>
      ) : null}
      {feedback.failed ? (
        <>
          <Alert tone="danger" title={labels.failed} />
          <Button onClick={feedback.onRetry}>
            <>{labels.retry}</>
          </Button>
        </>
      ) : null}
      {hasItems ? (
        <>
          <div className="vf-shop-product-grid vf-product-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(max(150px,calc((100%_-_48px)_/_3)),1fr))] tw:gap-y-7 tw:gap-x-5">
            {products.map((p, $index) => (
              <React.Fragment key={$index}>
                <ProductCard
                  images={p?.images}
                  priority={$index < 2}
                  name={p?.name}
                  subtitle={p?.sub}
                  price={p?.price}
                  stock={p?.stock}
                  badge={p?.badge}
                  badgeTone="accent"
                  frame={frame}
                  placeholder={labels.photo}
                  favLabel={labels.save}
                  favorite={p?.fav}
                  onFavorite={p?.toggleFav}
                  href={p?.href}
                  onClick={p?.select}
                />
              </React.Fragment>
            ))}
          </div>
          {showPaging ? (
            <>
              <LoadMore
                shown={paging?.shown}
                total={paging?.total}
                status={paging?.status}
                label={paging?.label}
                href={paging?.href}
                onClick={paging?.onClick}
              />
            </>
          ) : null}
        </>
      ) : null}
      {feedback.empty ? (
        <>
          <EmptyState
            icon="flower-2"
            title={labels.emptyTitle}
            titleAccent={labels.emptyAccent}
            body={labels.emptyBody}
          />
          <div className="tw:flex tw:justify-center">
            <Button variant="secondary" onClick={feedback.onClear}>
              <>{labels.clear}</>
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
}
