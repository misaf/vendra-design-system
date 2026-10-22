// StorefrontBag: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontBagLayout} from '../app/layouts/StorefrontBagLayout/StorefrontBagLayout.jsx';
import {StorefrontBagItems} from '../app/organisms/StorefrontBagItems/StorefrontBagItems.jsx';
import {StorefrontBagSummary} from '../app/organisms/StorefrontBagSummary/StorefrontBagSummary.jsx';
import {StorefrontBagSticky} from '../app/organisms/StorefrontBagSticky/StorefrontBagSticky.jsx';
import {StorefrontBagFeedback} from '../app/organisms/StorefrontBagFeedback/StorefrontBagFeedback.jsx';
import {StorefrontBagProgress} from '../app/organisms/StorefrontBagProgress/StorefrontBagProgress.jsx';
import {StorefrontBagRecipient} from '../app/organisms/StorefrontBagRecipient/StorefrontBagRecipient.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontBagLayout
            showContents={v.hasItems}
            notice={
              v.removedMessage ? (
                <StorefrontBagFeedback
                  variant="removed"
                  labels={{title: v.removedMessage, action: v.t?.undo}}
                  onAction={v.undoRemove}
                />
              ) : null
            }
            progress={
              v.hasItems ? (
                <StorefrontBagProgress
                  steps={v.steps}
                  current={v.stepIndex}
                  onStepClick={v.stepClick}
                  labels={{region: v.t?.steps, done: v.t?.doneStep}}
                  formatNumber={v.fmt}
                  captionFormat={v.caption}
                />
              ) : null
            }
            heading={
              v.hasItems ? (
                <>
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
                </>
              ) : null
            }
            items={
              v.hasItems ? (
                <>
                  {v.onBag ? (
                    <>
                      <StorefrontBagItems
                        lines={list(v.lines)}
                        removeLabel={v.t?.remove}
                        quantityLabels={v.qtyLabels}
                        formatQuantity={v.fmt}
                      />
                    </>
                  ) : null}
                  {v.onDelivery ? (
                    <>
                      <DS.ErrorSummary id="vf-errors" errors={v.problems} />
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
                        <StorefrontBagRecipient
                          title={v.t?.recipient}
                          saved={{
                            visible: v.hasSaved,
                            label: v.t?.saved,
                            options: list(v.savedAddresses)
                          }}
                          name={{
                            value: v.delivery?.name,
                            onChange: v.setName,
                            error: v.nameError,
                            label: v.t?.name
                          }}
                          phone={{
                            value: v.delivery?.phone,
                            onChange: v.setPhone,
                            error: v.phoneError,
                            label: v.t?.phone
                          }}
                        />
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
                        {v.preparationNotice && (
                          <p className="ag-field__hint tw:m-0">{v.preparationNotice}</p>
                        )}
                        {v.deliveryChanged && (
                          <div id="vf-delivery-changed" tabIndex={-1}>
                            <DS.Alert tone="warning" title={v.t.deliveryChanged}>
                              {v.deliverySuggestion ? (
                                <>
                                  <p>{v.deliverySuggestion}</p>
                                  <DS.Button onClick={v.confirmDelivery}>
                                    {v.t.confirmDelivery}
                                  </DS.Button>
                                </>
                              ) : (
                                <p>{v.t.noDelivery}</p>
                              )}
                            </DS.Alert>
                          </div>
                        )}
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
                      {v.cardsShown ? (
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
                          {v.cardAddedMessage && (
                            <DS.Alert
                              tone="neutral"
                              title={v.cardAddedMessage}
                              action={
                                <DS.Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={v.undoCard}
                                  aria-label={v.undoCardLabel}
                                >
                                  {v.t.undo}
                                </DS.Button>
                              }
                            />
                          )}
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
                                        id={c.addButtonId}
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
                      ) : null}
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
                </>
              ) : null
            }
            summary={
              v.hasItems ? (
                <>
                  <StorefrontBagSummary
                    summary={{title: v.t?.summary, lines: v.summary, sums: v.sums}}
                    freeDelivery={v.freeDelivery}
                    promo={{
                      visible: v.promoShown,
                      value: v.promoDraft,
                      onChange: v.setPromoDraft,
                      onApply: v.applyPromo,
                      error: v.promoError,
                      applied: v.promoStatus,
                      onRemove: v.removePromo
                    }}
                    actions={{
                      delivery: {visible: v.onBag, label: v.t?.toDelivery, onClick: v.toDelivery},
                      payment: {visible: v.onDelivery, label: v.t?.next, onClick: v.next},
                      back: {
                        visible: v.onDelivery,
                        label: v.t?.backToBag,
                        href: v.bagHref,
                        onClick: v.backToBag
                      }
                    }}
                    paymentNote={v.t?.payNote}
                  />
                </>
              ) : null
            }
            empty={
              v.noItems ? (
                <>
                  <StorefrontBagFeedback
                    variant="empty"
                    labels={{
                      title: v.t?.emptyA,
                      accent: v.t?.emptyB,
                      body: v.t?.emptyP,
                      action: v.t?.keep
                    }}
                    onAction={v.restore}
                  />
                </>
              ) : null
            }
          />
        </>
      }
      sticky={
        <>
          {v.hasItems ? (
            <>
              <StorefrontBagSticky
                summary={{label: v.t?.total, total: v.totalLabel}}
                delivery={{visible: v.onBag, label: v.t?.toDelivery, onClick: v.toDelivery}}
                payment={{visible: v.onDelivery, label: v.t?.next, onClick: v.next}}
              />
            </>
          ) : null}
        </>
      }
    />
  );
}
