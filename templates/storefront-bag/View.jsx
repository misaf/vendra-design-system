// StorefrontBag: the page inside the storefront shell.
import React from 'react';
import {list} from '../app/runtime.js';
import {StorefrontBagLayout} from '../app/layouts/StorefrontBagLayout/StorefrontBagLayout.jsx';
import {StorefrontBagItems} from '../app/organisms/StorefrontBagItems/StorefrontBagItems.jsx';
import {StorefrontBagSummary} from '../app/organisms/StorefrontBagSummary/StorefrontBagSummary.jsx';
import {StorefrontBagSticky} from '../app/organisms/StorefrontBagSticky/StorefrontBagSticky.jsx';
import {StorefrontBagFeedback} from '../app/organisms/StorefrontBagFeedback/StorefrontBagFeedback.jsx';
import {StorefrontBagProgress} from '../app/organisms/StorefrontBagProgress/StorefrontBagProgress.jsx';
import {StorefrontBagRecipient} from '../app/organisms/StorefrontBagRecipient/StorefrontBagRecipient.jsx';
import {StorefrontBagLocation} from '../app/organisms/StorefrontBagLocation/StorefrontBagLocation.jsx';
import {StorefrontBagSchedule} from '../app/organisms/StorefrontBagSchedule/StorefrontBagSchedule.jsx';
import {StorefrontBagCards} from '../app/organisms/StorefrontBagCards/StorefrontBagCards.jsx';
import {StorefrontBagSender} from '../app/organisms/StorefrontBagSender/StorefrontBagSender.jsx';
import {StorefrontBagDeliveryIntro} from '../app/organisms/StorefrontBagDeliveryIntro/StorefrontBagDeliveryIntro.jsx';
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
                      <StorefrontBagDeliveryIntro
                        errors={v.problems}
                        signin={{
                          visible: v.guest,
                          prompt: v.t?.signinPrompt,
                          label: v.t?.signin,
                          href: v.signinHref,
                          onClick: v.goSignin
                        }}
                      />
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
                        <StorefrontBagLocation
                          picker={{
                            visible: v.mapOk,
                            label: v.t?.pin,
                            status: v.pinStatus,
                            error: v.pinError,
                            value: v.delivery?.location,
                            onChange: v.map?.change,
                            loadLeaflet: v.map?.load,
                            tiles: v.map?.tiles,
                            center: v.map?.center,
                            zoom: v.map?.zoom,
                            locateLabel: v.t?.locate,
                            onLocateError: v.map?.locateError,
                            onReady: v.map?.ready,
                            onFail: v.map?.fail
                          }}
                          zone={{label: v.t?.zone, text: v.zoneText, status: v.zoneStatus}}
                          fallback={{
                            visible: v.mapFailed,
                            message: v.t?.mapFailed,
                            hint: v.zoneHint,
                            value: v.zone,
                            options: v.zones,
                            onChange: v.setZone
                          }}
                          address={{
                            value: v.delivery?.address,
                            onChange: v.setAddress,
                            error: v.addressError,
                            label: v.addressLabel,
                            hint: v.addressHint
                          }}
                        />
                      </section>
                      <StorefrontBagSchedule
                        title={v.t?.when}
                        preparationNotice={v.preparationNotice}
                        review={{
                          visible: v.deliveryChanged,
                          title: v.t.deliveryChanged,
                          suggestion: v.deliverySuggestion,
                          onConfirm: v.confirmDelivery,
                          confirmLabel: v.t.confirmDelivery,
                          unavailableLabel: v.t.noDelivery
                        }}
                        day={{
                          label: v.t?.day,
                          value: v.date,
                          onChange: v.setDate,
                          options: list(v.days)
                        }}
                        slot={{
                          label: v.t?.slot,
                          value: v.slot,
                          onChange: v.setSlot,
                          options: list(v.slots)
                        }}
                      />
                      {v.cardsShown ? (
                        <StorefrontBagCards
                          labels={{title: v.t?.cards, hint: v.t?.cardHint, undo: v.t.undo}}
                          notice={{
                            message: v.cardAddedMessage,
                            undoLabel: v.undoCardLabel,
                            onUndo: v.undoCard
                          }}
                          lines={list(v.cardLines)}
                        />
                      ) : null}
                      <StorefrontBagSender
                        labels={{title: v.t?.you, hint: v.t?.youHint}}
                        name={{
                          value: v.delivery?.sender,
                          onChange: v.setSender,
                          error: v.senderError,
                          label: v.t?.sender
                        }}
                        phone={{
                          value: v.delivery?.senderPhone,
                          onChange: v.setSenderPhone,
                          error: v.senderPhoneError,
                          label: v.t?.senderPhone
                        }}
                      />
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
