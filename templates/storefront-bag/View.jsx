// StorefrontBag: the page inside the storefront shell.
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
          <main id="main" tabIndex="-1" className="vf-form tw:mx-auto">
            {v.hasItems ? (
              <>
                <div className="vf-bag-steps tw:mb-5h">
                  <DS.Stepper
                    label={v.t?.steps}
                    steps={v.steps}
                    current={v.stepIndex}
                    onStepClick={v.stepClick}
                    doneLabel={v.t?.doneStep}
                    formatNumber={v.fmt}
                    compact={v.mob}
                    captionFormat={v.caption}
                  />
                </div>
                {v.onBag ? (
                  <>
                    <h1>
                      <>{v.t?.titleA} </>
                      <em className="vf-bag-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                        <>{v.t?.titleB}</>
                      </em>
                    </h1>
                  </>
                ) : null}
                {v.onDelivery ? (
                  <>
                    <h1>
                      <>{v.t?.deliveryA} </>
                      <em className="vf-bag-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                        <>{v.t?.deliveryB}</>
                      </em>
                    </h1>
                  </>
                ) : null}
                <div className="vf-bag-columns tw:flex tw:flex-wrap tw:gap-7 tw:items-start">
                  <div className="vf-bag-items tw:min-w-0 tw:flex tw:flex-col tw:[flex:999_1_480px] tw:gap-7">
                    {v.onBag ? (
                      <>
                        <div className="vf-bag-line-list tw:flex tw:flex-col tw:[border-top:1px_solid_var(--border-subtle)]">
                          {list(v.lines).map((l, $index) => (
                            <React.Fragment key={$index}>
                              <div className="vf-bag-line tw:[border-bottom:1px_solid_var(--border-subtle)] tw:py-4h tw:px-0">
                                <DS.LineItem
                                  image={l?.image}
                                  size="lg"
                                  unavailable={l?.unavailable}
                                  unavailableLabel={l?.unavailableLabel}
                                  name={l?.name}
                                  meta={l?.meta}
                                  note={l?.note}
                                  price={l?.price}
                                  quantity={l?.qty}
                                  onQuantityChange={l?.setQty}
                                  onRemove={l?.remove}
                                  removeLabel={v.t?.remove}
                                  quantityLabels={v.qtyLabels}
                                  formatQuantity={v.fmt}
                                />
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </>
                    ) : null}
                    {v.onDelivery ? (
                      <>
                        {v.hasProblems ? (
                          <>
                            <div
                              id="vf-errors"
                              tabIndex="-1"
                              className="vf-bag-errors tw:rounded-lg"
                            >
                              <DS.Alert tone="danger" title={v.problemTitle}>
                                <ul className="vf-bag-error-list tw:m-0 tw:ps-5 tw:flex tw:flex-col tw:gap-1">
                                  {list(v.problems).map((p, $index) => (
                                    <React.Fragment key={$index}>
                                      <li>
                                        <a href={p?.href} className="tw:text-inherit tw:underline">
                                          <>{p?.text}</>
                                        </a>
                                      </li>
                                    </React.Fragment>
                                  ))}
                                </ul>
                              </DS.Alert>
                            </div>
                          </>
                        ) : null}
                        {v.guest ? (
                          <>
                            <div className="vf-bag-signin tw:flex tw:items-center tw:justify-between tw:gap-3 tw:flex-wrap tw:py-3 tw:px-4 tw:rounded-md tw:bg-sunken tw:text-sm">
                              <span>
                                <>{v.t?.signinPrompt}</>
                              </span>
                              <DS.Button
                                variant="secondary"
                                size="sm"
                                iconStart="user"
                                href={v.signinHref}
                                onClick={v.goSignin}
                              >
                                <>{v.t?.signin}</>
                              </DS.Button>
                            </div>
                          </>
                        ) : null}
                        <section
                          className="vf-bag-delivery tw:flex tw:flex-col tw:gap-4h"
                          aria-labelledby="vf-recipient-title"
                        >
                          <h2
                            id="vf-recipient-title"
                            className="vf-bag-delivery-title tw:m-0 tw:font-display tw:font-medium tw:text-xl! tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]"
                          >
                            <>{v.t?.recipient}</>
                          </h2>
                          {v.hasSaved ? (
                            <>
                              <fieldset className="vf-bag-saved tw:[border:0] tw:p-0 tw:m-0 tw:min-w-0">
                                <legend className="ag-field__label tw:p-0 tw:mb-2">
                                  <>{v.t?.saved}</>
                                </legend>
                                <div className="tw:flex tw:flex-wrap tw:gap-2">
                                  {list(v.savedAddresses).map((a, $index) => (
                                    <React.Fragment key={$index}>
                                      <DS.Chip selected={a?.on} onClick={a?.pick}>
                                        <>{a?.label}</>
                                      </DS.Chip>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </fieldset>
                            </>
                          ) : null}
                          <div className="vf-bag-recipient-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
                            <DS.Input
                              id="vf-name"
                              value={v.delivery?.name}
                              onChange={v.setName}
                              error={v.nameError}
                              required={true}
                              label={v.t?.name}
                              autoComplete="off"
                            />
                            <DS.PhoneInput
                              id="vf-phone"
                              value={v.delivery?.phone}
                              onChange={v.setPhone}
                              error={v.phoneError}
                              required={true}
                              label={v.t?.phone}
                              autoComplete="off"
                              placeholder="0912 000 0000"
                            />
                          </div>
                          <div className="vf-bag-pin tw:flex tw:flex-col tw:gap-2">
                            {v.mapOk ? (
                              <>
                                <DS.LocationPicker
                                  id="vf-map"
                                  label={v.t?.pin}
                                  status={v.pinStatus}
                                  error={v.pinError}
                                  value={v.delivery?.location}
                                  onChange={v.map?.change}
                                  loadLeaflet={v.map?.load}
                                  tiles={v.map?.tiles}
                                  center={v.map?.center}
                                  zoom={v.map?.zoom}
                                  locateLabel={v.t?.locate}
                                  onLocateError={v.map?.locateError}
                                  onReady={v.map?.ready}
                                  onFail={v.map?.fail}
                                />
                                <div
                                  className="vf-bag-zone tw:flex tw:flex-col tw:gap-1 tw:pt-2"
                                  role="status"
                                >
                                  <span className="ag-field__label">
                                    <>{v.t?.zone}</>
                                  </span>
                                  {v.zoneText ? (
                                    <>
                                      <span className="tw:text-md tw:font-medium">
                                        <>{v.zoneText}</>
                                      </span>
                                    </>
                                  ) : null}
                                  <span className="ag-field__hint">
                                    <>{v.zoneStatus}</>
                                  </span>
                                </div>
                              </>
                            ) : null}
                            {v.mapFailed ? (
                              <>
                                <span className="ag-field__label">
                                  <>{v.t?.pin}</>
                                </span>
                                <p className="ag-field__hint tw:m-0">
                                  <>{v.t?.mapFailed}</>
                                </p>
                                <DS.Select
                                  id="vf-zone"
                                  label={v.t?.zone}
                                  hint={v.zoneHint}
                                  value={v.zone}
                                  options={v.zones}
                                  onChange={v.setZone}
                                />
                              </>
                            ) : null}
                          </div>
                          <DS.Input
                            id="vf-address"
                            value={v.delivery?.address}
                            onChange={v.setAddress}
                            error={v.addressError}
                            required={true}
                            label={v.addressLabel}
                            hint={v.addressHint}
                            autoComplete="off"
                          />
                        </section>
                        <section
                          className="vf-bag-delivery tw:flex tw:flex-col tw:gap-4h"
                          aria-labelledby="vf-when-title"
                        >
                          <h2
                            id="vf-when-title"
                            className="vf-bag-delivery-title tw:m-0 tw:font-display tw:font-medium tw:text-xl! tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]"
                          >
                            <>{v.t?.when}</>
                          </h2>
                          <DS.ChoiceGroup
                            legend={v.t?.day}
                            minTileWidth={104}
                            value={v.date}
                            onChange={v.setDate}
                          >
                            {list(v.days).map((d, $index) => (
                              <React.Fragment key={$index}>
                                <DS.ChoiceTile
                                  size="sm"
                                  value={d?.value}
                                  label={d?.label}
                                  description={d?.desc}
                                  disabled={d?.off}
                                />
                              </React.Fragment>
                            ))}
                          </DS.ChoiceGroup>
                          <DS.ChoiceGroup
                            legend={v.t?.slot}
                            minTileWidth={130}
                            value={v.slot}
                            onChange={v.setSlot}
                          >
                            {list(v.slots).map((z, $index) => (
                              <React.Fragment key={$index}>
                                <DS.ChoiceTile
                                  size="sm"
                                  value={z?.value}
                                  label={z?.label}
                                  description={z?.desc}
                                  disabled={z?.off}
                                />
                              </React.Fragment>
                            ))}
                          </DS.ChoiceGroup>
                        </section>
                        <section
                          className="vf-bag-delivery tw:flex tw:flex-col tw:gap-4h"
                          aria-labelledby="vf-cards-title"
                        >
                          <div className="tw:flex tw:flex-col tw:gap-1">
                            <h2
                              id="vf-cards-title"
                              className="vf-bag-delivery-title tw:m-0 tw:font-display tw:font-medium tw:text-xl! tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]"
                            >
                              <>{v.t?.cards}</>
                            </h2>
                            <p className="ag-field__hint tw:m-0">
                              <>{v.t?.cardHint}</>
                            </p>
                          </div>
                          {list(v.cardLines).map((c, $index) => (
                            <React.Fragment key={$index}>
                              <div className="vf-bag-card">
                                {c?.hasCard ? (
                                  <>
                                    <DS.Input
                                      id={c?.id}
                                      value={c?.value}
                                      onChange={c?.setCard}
                                      error={c?.error}
                                      required={true}
                                      maxLength={200}
                                      label={c?.label}
                                      hint={c?.detail}
                                      multiline={true}
                                      rows={3}
                                    />
                                  </>
                                ) : null}
                                {c?.noCard ? (
                                  <>
                                    <div className="tw:flex tw:items-center tw:justify-between tw:gap-3 tw:flex-wrap tw:py-2 tw:[border-top:1px_solid_var(--border-subtle)]">
                                      <span className="tw:flex tw:flex-col">
                                        <span className="tw:font-medium">
                                          <>{c?.name}</>
                                        </span>
                                        <span className="tw:text-sm tw:text-quiet">
                                          <>{c?.detail}</>
                                        </span>
                                      </span>
                                      <DS.Button
                                        variant="secondary"
                                        size="sm"
                                        iconStart="plus"
                                        aria-label={c?.addAria}
                                        onClick={c?.add}
                                      >
                                        <>{c?.addLabel}</>
                                      </DS.Button>
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </React.Fragment>
                          ))}
                        </section>
                        <section
                          className="vf-bag-delivery tw:flex tw:flex-col tw:gap-4h"
                          aria-labelledby="vf-you-title"
                        >
                          <div className="tw:flex tw:flex-col tw:gap-1">
                            <h2
                              id="vf-you-title"
                              className="vf-bag-delivery-title tw:m-0 tw:font-display tw:font-medium tw:text-xl! tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]"
                            >
                              <>{v.t?.you}</>
                            </h2>
                            <p className="ag-field__hint tw:m-0">
                              <>{v.t?.youHint}</>
                            </p>
                          </div>
                          <div className="vf-bag-recipient-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
                            <DS.Input
                              id="vf-sender"
                              value={v.delivery?.sender}
                              onChange={v.setSender}
                              error={v.senderError}
                              required={true}
                              label={v.t?.sender}
                              autoComplete="name"
                            />
                            <DS.PhoneInput
                              id="vf-sender-phone"
                              value={v.delivery?.senderPhone}
                              onChange={v.setSenderPhone}
                              error={v.senderPhoneError}
                              required={true}
                              label={v.t?.senderPhone}
                              placeholder="0912 000 0000"
                            />
                          </div>
                        </section>
                      </>
                    ) : null}
                  </div>
                  <aside className="vf-bag-summary tw:flex tw:flex-col tw:gap-4 tw:[flex:1_1_380px] tw:max-w-[440px] tw:sticky tw:top-9">
                    <DS.Card padding={20}>
                      <DS.OrderSummary title={v.t?.summary} lines={v.summary} sums={v.sums} />
                    </DS.Card>
                    {v.noPromo ? (
                      <>
                        <form
                          className="vf-bag-promo tw:flex tw:flex-col tw:gap-2"
                          onSubmit={v.applyPromo}
                          noValidate=""
                        >
                          <label className="ag-field__label" htmlFor="vf-promo">
                            <>{v.t?.promo}</>
                          </label>
                          <div className="vf-bag-promo-row tw:grid tw:gap-2">
                            <DS.Input
                              id="vf-promo"
                              value={v.promoDraft}
                              onChange={v.setPromoDraft}
                              error={v.promoError}
                              autoComplete="off"
                              dir="ltr"
                            />
                            <div className="vf-bag-promo-apply">
                              <DS.Button variant="ghost" size="sm" type="submit">
                                <>{v.t?.apply}</>
                              </DS.Button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : null}
                    {v.hasPromo ? (
                      <>
                        <div
                          className="vf-bag-promo-applied tw:flex tw:items-center tw:justify-between tw:gap-3 tw:text-sm"
                          role="status"
                        >
                          <span className="tw:flex tw:items-center tw:gap-2">
                            <DS.Icon name="tag" size={16} />
                            <>{v.promoStatus}</>
                          </span>
                          <DS.Button variant="ghost" size="sm" onClick={v.removePromo}>
                            <>{v.t?.removePromo}</>
                          </DS.Button>
                        </div>
                      </>
                    ) : null}
                    {v.desk ? (
                      <>
                        {v.onBag ? (
                          <>
                            <DS.Button
                              variant="primary"
                              size="lg"
                              block={true}
                              iconEnd="arrow-right"
                              onClick={v.toDelivery}
                            >
                              <>{v.t?.toDelivery}</>
                            </DS.Button>
                          </>
                        ) : null}
                        {v.onDelivery ? (
                          <>
                            <DS.Button
                              variant="primary"
                              size="lg"
                              block={true}
                              iconEnd="arrow-right"
                              onClick={v.next}
                            >
                              <>{v.t?.next}</>
                            </DS.Button>
                          </>
                        ) : null}
                      </>
                    ) : null}
                    {v.onDelivery ? (
                      <>
                        <DS.Button
                          variant="ghost"
                          size="lg"
                          block={true}
                          iconStart="arrow-left"
                          href={v.bagHref}
                          onClick={v.backToBag}
                        >
                          <>{v.t?.backToBag}</>
                        </DS.Button>
                      </>
                    ) : null}
                    <p className="vf-bag-payment-note tw:m-0 tw:text-sm tw:leading-body tw:text-quiet tw:text-center">
                      <>{v.t?.payNote}</>
                    </p>
                  </aside>
                </div>
              </>
            ) : null}
            {v.noItems ? (
              <>
                <div className="vf-bag-empty tw:flex tw:flex-col tw:items-center tw:py-7 tw:px-0 tw:gap-4h">
                  <DS.EmptyState
                    icon="shopping-bag"
                    headingLevel={1}
                    title={v.t?.emptyA}
                    titleAccent={v.t?.emptyB}
                    body={v.t?.emptyP}
                  />
                  <DS.Button variant="primary" onClick={v.restore}>
                    <>{v.t?.keep}</>
                  </DS.Button>
                </div>
              </>
            ) : null}
          </main>
        </>
      }
      sticky={
        <>
          {v.hasItems ? (
            <>
              <div className="vf-mobile-action tw:flex tw:items-center tw:gap-3 tw:py-3 tw:px-4 tw:bg-card tw:[border-top:1px_solid_var(--border-subtle)]">
                <div className="vf-action-total">
                  <span className="vf-action-caption tw:text-xs tw:text-quiet">
                    <>{v.t?.total}</>
                  </span>
                  <span className="vf-price">
                    <>{v.totalLabel}</>
                  </span>
                </div>
                {v.onBag ? (
                  <>
                    <DS.Button variant="primary" iconEnd="arrow-right" onClick={v.toDelivery}>
                      <>{v.t?.toDelivery}</>
                    </DS.Button>
                  </>
                ) : null}
                {v.onDelivery ? (
                  <>
                    <DS.Button variant="primary" iconEnd="arrow-right" onClick={v.next}>
                      <>{v.t?.next}</>
                    </DS.Button>
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </>
      }
    />
  );
}
