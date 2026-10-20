// StorefrontProduct: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontProductLayout} from '../app/layouts/StorefrontProductLayout/StorefrontProductLayout.jsx';
import {Shell} from '../app/Shell.jsx';
import {CollectionCarousel} from '../_shared/collection-carousel.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontProductLayout
            breadcrumbs={
              <DS.Breadcrumb
                label={v.t?.crumbs}
                className="tw:mb-5h"
                items={[
                  {label: v.t?.shop, href: v.href?.shop},
                  {label: v.t?.cat, href: v.category?.href},
                  {label: v.t?.name}
                ]}
              />
            }
            gallery={
              <>
                <DS.Gallery
                  key={v.t?.name}
                  images={v.productImages}
                  onIndexChange={v.setGalleryPhoto}
                  aspect="4/5"
                  label={v.t?.photos}
                  slideLabel={v.t?.slide}
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
                <div>
                  <DS.Button variant="secondary" size="sm" iconStart="image" onClick={v.openPhotos}>
                    <>{v.t?.fullScreen}</>
                  </DS.Button>
                </div>
                <DS.Lightbox
                  label={v.t?.photos}
                  items={v.photoItems}
                  index={v.photo}
                  onIndexChange={v.setPhoto}
                  onClose={v.closePhotos}
                />
              </>
            }
            details={
              <>
                <div className="vf-product-heading tw:flex tw:flex-col tw:gap-2">
                  <div className="vf-product-title tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2">
                    <h1 id="vf-product-code">
                      <>{v.t?.name}</>
                    </h1>
                    <DS.Button iconStart="copy" variant="ghost" onClick={v.copyCode}>
                      <>{v.t?.copyCode}</>
                    </DS.Button>
                  </div>
                  <div className="vf-product-category tw:flex tw:flex-wrap tw:gap-2 tw:items-center">
                    <span className="vf-product-subtitle tw:text-sm tw:text-quiet">
                      <>{v.t?.sub}</>
                    </span>
                    <DS.Badge tone="accent">
                      <>{v.t?.badge}</>
                    </DS.Badge>
                  </div>
                  <div className="vf-product-price-stock tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2">
                    <div className="tw:flex tw:flex-col tw:gap-1">
                      <span className="vf-product-unit-label tw:text-sm tw:text-quiet">
                        {v.unitPriceLabel}
                      </span>
                      <DS.Price value={v.unitPrice} size="lg" className="vf-product-price" />
                    </div>
                    <DS.StockStatus stock={v.stock} />
                  </div>
                  <p className="vf-product-description tw:text-secondary tw:m-0 tw:max-w-[52ch] tw:text-base tw:leading-body tw:text-pretty">
                    <>{v.t?.desc}</>
                  </p>
                </div>
                {v.hasSizes ? (
                  <>
                    <DS.ChoiceGroup
                      className="vf-product-sizes"
                      legend={v.t?.size}
                      columns={3}
                      value={v.size}
                      onChange={v.setSize}
                    >
                      {list(v.sizes).map((z, $index) => (
                        <React.Fragment key={$index}>
                          <DS.ChoiceTile value={z?.value} label={z?.label} description={z?.desc} />
                        </React.Fragment>
                      ))}
                    </DS.ChoiceGroup>
                  </>
                ) : null}
                {v.addons?.length ? (
                  <fieldset className="vf-product-extras tw:[border:0] tw:p-0 tw:m-0 tw:flex tw:flex-col tw:gap-3">
                    <legend className="vf-product-extras-legend tw:text-sm tw:font-medium tw:mb-3 tw:p-0">
                      <>{v.t?.extras}</>
                    </legend>
                    {list(v.addons).map((a, $index) => (
                      <React.Fragment key={$index}>
                        <DS.Checkbox label={a?.label} checked={a?.on} onChange={a?.toggle} />
                      </React.Fragment>
                    ))}
                  </fieldset>
                ) : null}
                <div className="vf-product-selection-summary tw:flex tw:flex-col tw:gap-1">
                  <div
                    className="vf-product-selection-total tw:max-md:hidden tw:flex tw:flex-wrap tw:items-baseline tw:justify-between tw:gap-2"
                    role="status"
                    aria-atomic="true"
                  >
                    <span className="tw:text-sm tw:font-medium">{v.selectionTotalLabel}</span>
                    <DS.Price value={v.totalLabel} />
                  </div>
                  <p className="vf-product-total-hint tw:m-0 tw:text-sm tw:text-quiet">
                    {v.totalHint}
                  </p>
                </div>
                <div className="tw:flex tw:gap-3 tw:items-center tw:flex-wrap">
                  <DS.QuantityInput
                    value={v.qty}
                    min={1}
                    max={v.qtyMax}
                    onChange={v.setQty}
                    labels={v.qtyLabels}
                  />
                  <DS.IconButton
                    icon="heart"
                    label={v.t?.saveDesign}
                    variant="secondary"
                    size="lg"
                    active={v.fav}
                    onClick={v.toggleSave}
                    className="vf-product-save"
                  />
                  <div className="vf-product-add-button tw:max-md:hidden tw:min-w-0 vf-product-add tw:[flex:1_1_260px]">
                    <DS.Button
                      variant="primary"
                      size="lg"
                      block={true}
                      iconStart="shopping-bag"
                      onClick={v.add}
                      disabled={v.unavailable}
                    >
                      <>{v.addLabel}</>
                    </DS.Button>
                  </div>
                </div>
                <div className="vf-product-delivery tw:flex tw:items-center tw:gap-3 tw:text-sm tw:text-quiet">
                  <DS.Icon name="truck" size={18} />
                  <span>
                    <>{v.t?.ship}</>
                  </span>
                </div>
                {v.waHref ? (
                  <>
                    <a
                      className="vf-product-ask tw:flex tw:items-center tw:in-data-[density=tv]:min-h-tap tw:gap-3 tw:text-sm tw:text-secondary tw:self-start tw:[text-underline-offset:3px]"
                      href={v.waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <DS.Icon name="message-circle" size={18} />
                      <span>
                        <>{v.t?.askWa}</>
                      </span>
                    </a>
                  </>
                ) : null}
                <DS.Accordion items={v.faq} defaultValue="care" />
              </>
            }
            related={
              <>
                {/* Recently viewed comes from this browser's history; a bad entry mustn't take the page down. */}
                <DS.ErrorBoundary resetKey={v.productId}>
                  {v.hasRecent ? (
                    <>
                      <section className="vf-product-recent tw:flex tw:flex-col">
                        <DS.SectionHeader
                          eyebrow={v.t?.recentEb}
                          title={v.t?.recentA}
                          accent={v.t?.recentB}
                        />
                        <CollectionCarousel
                          key={v.productId}
                          total={list(v.recent).length}
                          countLabel={v.t?.recentCount(list(v.recent).length)}
                          label={v.recentLabel}
                          perView={4}
                          perViewMobile={1.15}
                          itemMin="220px"
                          gap="20px"
                          arrows={true}
                          prevLabel={v.t?.recentPrev}
                          nextLabel={v.t?.recentNext}
                        >
                          {list(v.recent).map((p, $index) => (
                            <React.Fragment key={$index}>
                              <DS.ProductCard
                                images={p?.images}
                                sizes={
                                  v.recent.length === 1
                                    ? '(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 25vw'
                                    : '(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 25vw'
                                }
                                name={p?.name}
                                subtitle={p?.sub}
                                price={p?.price}
                                stock={p?.stock}
                                frame="soft"
                                placeholder={v.t?.photo}
                                favLabel={v.t?.save}
                                favorite={p?.fav}
                                onFavorite={p?.toggleFav}
                                href={p?.href}
                              />
                            </React.Fragment>
                          ))}
                        </CollectionCarousel>
                      </section>
                    </>
                  ) : null}
                </DS.ErrorBoundary>
              </>
            }
            feedback={
              <>
                <DS.Dialog
                  open={v.addedOpen}
                  onClose={v.closeAdded}
                  title={v.t?.added}
                  closeLabel={v.t?.dismiss}
                  maxWidth={440}
                >
                  <div className="vf-product-added tw:flex tw:flex-col tw:gap-5">
                    <DS.OrderSummary lines={v.addedLines} sums={v.addedSums} />
                    <div className="tw:flex tw:flex-col tw:gap-2">
                      <DS.Button
                        variant="primary"
                        size="lg"
                        block={true}
                        iconEnd="arrow-right"
                        href={v.href?.bag}
                        onClick={v.checkout}
                        autoFocus={true}
                        className="vf-product-added-checkout"
                      >
                        <>{v.t?.checkout}</>
                      </DS.Button>
                      <DS.Button variant="ghost" size="lg" block={true} onClick={v.closeAdded}>
                        <>{v.t?.keepShopping}</>
                      </DS.Button>
                    </div>
                  </div>
                </DS.Dialog>
                <DS.ToastRegion
                  queue={v.toasts}
                  closeLabel={v.t?.dismiss}
                  className="vf-product-toasts"
                />
              </>
            }
          />
        </>
      }
      sticky={
        <>
          <div className="vf-product-mobile-action tw:relative tw:flex tw:flex-wrap tw:gap-3 tw:items-center tw:bg-card tw:[border-top:1px_solid_var(--border-subtle)] tw:py-2 tw:px-4">
            <div
              className="vf-product-mobile-total tw:flex-1 tw:flex tw:flex-col tw:gap-1"
              role="status"
              aria-atomic="true"
            >
              <span className="vf-product-total-label tw:text-xs tw:text-quiet">
                {v.selectionTotalLabel}
              </span>
              <DS.Price value={v.totalLabel} size="sm" />
            </div>
            <DS.Button
              variant="primary"
              iconStart="shopping-bag"
              onClick={v.add}
              disabled={v.unavailable}
            >
              <>{v.addLabel}</>
            </DS.Button>
          </div>
        </>
      }
    />
  );
}
