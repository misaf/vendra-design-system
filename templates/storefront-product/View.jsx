// StorefrontProduct: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontProductLayout} from '../app/layouts/StorefrontProductLayout/StorefrontProductLayout.jsx';
import {StorefrontProductGallery} from '../app/organisms/StorefrontProductGallery/StorefrontProductGallery.jsx';
import {StorefrontProductHeading} from '../app/organisms/StorefrontProductHeading/StorefrontProductHeading.jsx';
import {StorefrontProductConfiguration} from '../app/organisms/StorefrontProductConfiguration/StorefrontProductConfiguration.jsx';
import {StorefrontProductPurchase} from '../app/organisms/StorefrontProductPurchase/StorefrontProductPurchase.jsx';
import {StorefrontProductCare} from '../app/organisms/StorefrontProductCare/StorefrontProductCare.jsx';
import {StorefrontProductAdded} from '../app/organisms/StorefrontProductAdded/StorefrontProductAdded.jsx';
import {StorefrontProductSticky} from '../app/organisms/StorefrontProductSticky/StorefrontProductSticky.jsx';
import {Shell} from '../app/Shell.jsx';
import {StorefrontProductRecent} from '../app/organisms/StorefrontProductRecent/StorefrontProductRecent.jsx';

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
                <StorefrontProductCare
                  deliveryText={v.t?.ship}
                  inquiry={{href: v.waHref, label: v.t?.askWa}}
                  items={v.faq}
                />
              </>
            }
            related={
              <>
                {/* Recently viewed comes from this browser's history; a bad entry mustn't take the page down. */}
                <DS.ErrorBoundary resetKey={v.productId}>
                  {v.hasRecent ? (
                    <>
                      <StorefrontProductRecent
                        products={list(v.recent)}
                        resetKey={v.productId}
                        labels={{
                          eyebrow: v.t?.recentEb,
                          title: v.t?.recentA,
                          accent: v.t?.recentB,
                          count: v.t?.recentCount(list(v.recent).length),
                          region: v.recentLabel,
                          previous: v.t?.recentPrev,
                          next: v.t?.recentNext,
                          photo: v.t?.photo,
                          save: v.t?.save
                        }}
                      />
                    </>
                  ) : null}
                </DS.ErrorBoundary>
              </>
            }
            feedback={
              <>
                <StorefrontProductAdded
                  open={v.addedOpen}
                  onClose={v.closeAdded}
                  lines={v.addedLines}
                  sums={v.addedSums}
                  checkout={{href: v.href?.bag, onClick: v.checkout}}
                  labels={{
                    title: v.t?.added,
                    close: v.t?.dismiss,
                    checkout: v.t?.checkout,
                    continue: v.t?.keepShopping
                  }}
                />
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
          <StorefrontProductSticky
            summary={{label: v.selectionTotalLabel, total: v.totalLabel}}
            add={{label: v.addLabel, disabled: v.unavailable, onClick: v.add}}
          />
        </>
      }
    />
  );
}
