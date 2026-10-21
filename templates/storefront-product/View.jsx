// StorefrontProduct: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontProductLayout} from '../app/layouts/StorefrontProductLayout/StorefrontProductLayout.jsx';
import {StorefrontProductGallery} from '../app/organisms/StorefrontProductGallery/StorefrontProductGallery.jsx';
import {StorefrontProductHeading} from '../app/organisms/StorefrontProductHeading/StorefrontProductHeading.jsx';
import {StorefrontProductConfiguration} from '../app/organisms/StorefrontProductConfiguration/StorefrontProductConfiguration.jsx';
import {StorefrontProductPurchase} from '../app/organisms/StorefrontProductPurchase/StorefrontProductPurchase.jsx';
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
              <StorefrontProductGallery
                productCode={v.t?.name}
                images={v.productImages}
                items={v.photoItems}
                index={v.photo}
                labels={{photos: v.t?.photos, slide: v.t?.slide, fullScreen: v.t?.fullScreen}}
                onGalleryIndexChange={v.setGalleryPhoto}
                onOpen={v.openPhotos}
                onIndexChange={v.setPhoto}
                onClose={v.closePhotos}
              />
            }
            details={
              <>
                <StorefrontProductHeading
                  productCode={v.t?.name}
                  subtitle={v.t?.sub}
                  badge={v.t?.badge}
                  unitPriceLabel={v.unitPriceLabel}
                  unitPrice={v.unitPrice}
                  stock={v.stock}
                  description={v.t?.desc}
                  copyLabel={v.t?.copyCode}
                  onCopyCode={v.copyCode}
                />
                <StorefrontProductConfiguration
                  showSizes={v.hasSizes}
                  sizes={list(v.sizes)}
                  size={v.size}
                  onSizeChange={v.setSize}
                  showAddons={!!v.addons?.length}
                  addons={list(v.addons)}
                  labels={{size: v.t?.size, extras: v.t?.extras}}
                />
                <StorefrontProductPurchase
                  summary={{label: v.selectionTotalLabel, total: v.totalLabel, hint: v.totalHint}}
                  quantity={{value: v.qty, max: v.qtyMax, labels: v.qtyLabels, onChange: v.setQty}}
                  save={{label: v.t?.saveDesign, active: v.fav, onClick: v.toggleSave}}
                  add={{label: v.addLabel, disabled: v.unavailable, onClick: v.add}}
                />
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
