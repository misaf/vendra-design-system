// StorefrontProduct: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {interp, list, cssToObj} from '../app/runtime.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main id="main" tabIndex="-1" className="vf-shopping tw:mx-auto">
            <nav
              aria-label={v.t?.crumbs}
              className="vf-product-breadcrumb tw:flex tw:gap-2 tw:text-sm tw:text-quiet tw:mb-5h"
            >
              <a
                href={v.href?.shop}
                onClick={v.go?.shop}
                className="vf-product-breadcrumb-link tw:text-quiet!"
              >
                <>{interp(v.t?.shop)}</>
              </a>
              <span>{'\u00b7'}</span>
              <a
                href={v.category?.href}
                onClick={v.category?.go}
                className="vf-product-breadcrumb-link tw:text-quiet!"
              >
                <>{interp(v.t?.cat)}</>
              </a>
            </nav>
            <div className="vf-product-columns tw:grid tw:items-start tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))] tw:gap-8">
              <div className="tw:flex tw:flex-col tw:gap-3">
                <DS.Gallery
                  images={v.productImages}
                  aspect="4/5"
                  label={v.t?.photos}
                  slideLabel={v.t?.slide}
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
              </div>
              <div className="vf-product-details tw:flex tw:flex-col tw:gap-5 tw:sticky tw:top-9">
                <div className="vf-product-heading tw:flex tw:flex-col tw:gap-3">
                  <div className="tw:flex tw:gap-2 tw:items-center">
                    <DS.Badge tone="accent">
                      <>{interp(v.t?.badge)}</>
                    </DS.Badge>
                    <span className="vf-product-subtitle tw:text-sm tw:text-quiet">
                      <>{interp(v.t?.sub)}</>
                    </span>
                  </div>
                  <div className="vf-product-title tw:flex tw:items-center tw:gap-2">
                    <h1 id="vf-product-code">
                      <>{interp(v.t?.name)}</>
                    </h1>
                    <DS.IconButton
                      icon="copy"
                      label={v.t?.copyCode}
                      variant="ghost"
                      size="sm"
                      onClick={v.copyCode}
                    />
                  </div>
                  <div className="vf-product-price tw:text-lg tw:font-medium">
                    <>{interp(v.unitPrice)}</>
                  </div>
                  <p className="vf-product-description tw:text-secondary tw:m-0 tw:max-w-[52ch] tw:text-base tw:leading-body tw:text-pretty">
                    <>{interp(v.t?.desc)}</>
                  </p>
                </div>
                {v.hasSizes ? (
                  <>
                    <DS.ChoiceGroup
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
                <fieldset className="vf-product-extras tw:[border:0] tw:p-0 tw:m-0 tw:flex tw:flex-col tw:gap-3">
                  <legend className="vf-product-extras-legend tw:text-sm tw:font-medium tw:mb-3 tw:p-0">
                    <>{interp(v.t?.extras)}</>
                  </legend>
                  {list(v.addons).map((a, $index) => (
                    <React.Fragment key={$index}>
                      <DS.Checkbox label={a?.label} checked={a?.on} onChange={a?.toggle} />
                    </React.Fragment>
                  ))}
                </fieldset>
                <div className="tw:flex tw:gap-3 tw:items-center tw:flex-wrap">
                  <DS.QuantityInput
                    value={v.qty}
                    min={1}
                    max={9}
                    onChange={v.setQty}
                    labels={v.qtyLabels}
                  />
                  <DS.IconButton
                    icon="heart"
                    label={v.t?.saveDesign}
                    variant="outline"
                    size="lg"
                    active={v.fav}
                    onClick={v.toggleSave}
                    className="vf-product-save"
                  />
                  {v.desk ? (
                    <>
                      {v.toast ? (
                        <>
                          <div
                            className="vf-product-toast tw:fixed tw:z-toast tw:bottom-6 tw:end-6 tw:max-w-[calc(100%_-_48px)]"
                            onMouseEnter={v.holdToast}
                            onMouseLeave={v.releaseToast}
                            onFocus={v.holdToast}
                            onBlur={v.releaseToast}
                          >
                            <DS.Toast
                              title={v.toast?.title}
                              action={v.toast?.action}
                              onClose={v.toast?.close}
                              closeLabel={v.t?.dismiss}
                            />
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}
                  {v.desk ? (
                    <>
                      <div className="vf-product-add-button tw:min-w-0 vf-product-add tw:[flex:1_1_260px]">
                        <DS.Button
                          variant="primary"
                          size="lg"
                          block={true}
                          iconStart="shopping-bag"
                          onClick={v.add}
                          disabled={v.unavailable}
                        >
                          <>{interp(v.addLabel)}</>
                        </DS.Button>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="vf-product-delivery tw:flex tw:items-center tw:gap-3 tw:text-sm tw:text-quiet">
                  <DS.Icon name="truck" size={18} />
                  <span>
                    <>{interp(v.t?.ship)}</>
                  </span>
                </div>
                {v.waHref ? (
                  <>
                    <a
                      className="vf-product-ask tw:flex tw:items-center tw:gap-3 tw:text-sm tw:text-secondary tw:self-start tw:[text-underline-offset:3px]"
                      href={v.waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <DS.Icon name="message-circle" size={18} />
                      <span>
                        <>{interp(v.t?.askWa)}</>
                      </span>
                    </a>
                  </>
                ) : null}
                <DS.Accordion items={v.faq} defaultValue="care" />
              </div>
            </div>
            {v.hasRecent ? (
              <>
                <section className="vf-product-recent tw:flex tw:flex-col tw:gap-6 tw:mt-9">
                  <DS.SectionHeader
                    eyebrow={v.t?.recentEb}
                    title={v.t?.recentA}
                    accent={v.t?.recentB}
                  />
                  <DS.Carousel
                    label={v.recentLabel}
                    perView={4}
                    perViewMobile={2.2}
                    itemMin="200px"
                    gap="20px"
                  >
                    {list(v.recent).map((p, $index) => (
                      <React.Fragment key={$index}>
                        <DS.ProductCard
                          images={p?.images}
                          name={p?.name}
                          subtitle={p?.sub}
                          price={p?.price}
                          frame="soft"
                          placeholder={v.t?.photo}
                          favLabel={v.t?.save}
                          favorite={p?.fav}
                          onFavorite={p?.toggleFav}
                          href={p?.href}
                          onClick={p?.go}
                        />
                      </React.Fragment>
                    ))}
                  </DS.Carousel>
                </section>
              </>
            ) : null}
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
                    <>{interp(v.t?.checkout)}</>
                  </DS.Button>
                  <DS.Button variant="ghost" size="lg" block={true} onClick={v.closeAdded}>
                    <>{interp(v.t?.keepShopping)}</>
                  </DS.Button>
                </div>
              </div>
            </DS.Dialog>
          </main>
        </>
      }
      sticky={
        <>
          <div className="vf-product-mobile-action tw:relative tw:flex tw:gap-3 tw:items-center tw:bg-card tw:[border-top:1px_solid_var(--border-subtle)] tw:py-2 tw:px-4">
            <div className="vf-product-mobile-total tw:flex-1 tw:font-medium tw:text-sm">
              <>{interp(v.totalLabel)}</>
            </div>
            <DS.Button
              variant="primary"
              iconStart="shopping-bag"
              onClick={v.add}
              disabled={v.unavailable}
            >
              <>{interp(v.t?.add)}</>
            </DS.Button>
            {v.toast ? (
              <>
                <div
                  className="vf-product-toast tw:absolute tw:bottom-full tw:inset-x-4 tw:mb-3"
                  onMouseEnter={v.holdToast}
                  onMouseLeave={v.releaseToast}
                  onFocus={v.holdToast}
                  onBlur={v.releaseToast}
                >
                  <DS.Toast
                    title={v.toast?.title}
                    action={v.toast?.action}
                    onClose={v.toast?.close}
                    closeLabel={v.t?.dismiss}
                  />
                </div>
              </>
            ) : null}
          </div>
        </>
      }
    />
  );
}
