// StorefrontBag: the page inside the storefront shell.
import React from 'react';
import {Alert} from '../../../design-system/components/Alert/Alert.jsx';
import {asList} from '../../shell/ui/as-list.js';
import {StorefrontBagDeliveryLayout} from './components/StorefrontBagDeliveryLayout/StorefrontBagDeliveryLayout.jsx';
import {StorefrontBagLayout} from './components/StorefrontBagLayout/StorefrontBagLayout.jsx';
import {StorefrontBagItems} from './components/StorefrontBagItems/StorefrontBagItems.jsx';
import {StorefrontBagSummary} from './components/StorefrontBagSummary/StorefrontBagSummary.jsx';
import {StorefrontBagSticky} from './components/StorefrontBagSticky/StorefrontBagSticky.jsx';
import {StorefrontBagFeedback} from './components/StorefrontBagFeedback/StorefrontBagFeedback.jsx';
import {StorefrontStepProgress} from '../../shell/components/StorefrontStepProgress/StorefrontStepProgress.jsx';
import {StorefrontBagRecipient} from './components/StorefrontBagRecipient/StorefrontBagRecipient.jsx';
import {StorefrontBagLocation} from './components/StorefrontBagLocation/StorefrontBagLocation.jsx';
import {DeliverySlotPicker} from '../../delivery/components/DeliverySlotPicker/DeliverySlotPicker.jsx';
import {StorefrontBagCards} from './components/StorefrontBagCards/StorefrontBagCards.jsx';
import {StorefrontBagSender} from './components/StorefrontBagSender/StorefrontBagSender.jsx';
import {StorefrontBagDeliveryIntro} from './components/StorefrontBagDeliveryIntro/StorefrontBagDeliveryIntro.jsx';
import {StorefrontPageHeading} from '../../shell/components/StorefrontPageHeading/StorefrontPageHeading';
import {Shell} from '../../shell/components/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      enclosedCheckout={
        v.onDelivery && v.hasItems
          ? {
              back: {href: v.bagHref, label: v.t?.backToBag, onClick: v.backToBag},
              confirmLeave: true
            }
          : undefined
      }
      content={
        <StorefrontBagLayout
          showContents={v.hasItems}
          editingItems={v.onBag}
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
              <div className="vf-bag-steps tw:mb-5h">
                <StorefrontStepProgress
                  steps={v.steps}
                  current={v.stepIndex}
                  onStepClick={v.stepClick}
                  labels={{region: v.t?.steps, done: v.t?.doneStep}}
                  formatNumber={v.fmt}
                  captionFormat={v.caption}
                />
              </div>
            ) : null
          }
          heading={
            v.hasItems ? (
              <>
                {v.onBag ? (
                  <StorefrontPageHeading title={v.t?.titleA} accent={v.t?.titleB} />
                ) : null}
                {v.onDelivery ? (
                  <StorefrontPageHeading title={v.t?.deliveryA} accent={v.t?.deliveryB} />
                ) : null}
              </>
            ) : null
          }
          items={
            v.hasItems ? (
              <>
                {v.onBag && v.checkoutBagError ? (
                  <div id="vf-checkout-bag-error" tabIndex={-1} data-vf-keep-focus>
                    <Alert tone="danger">{v.checkoutBagError}</Alert>
                  </div>
                ) : null}
                {v.onBag ? (
                  <StorefrontBagItems
                    lines={asList(v.lines)}
                    removeLabel={v.t?.remove}
                    quantityLabels={v.qtyLabels}
                    formatQuantity={v.fmt}
                  />
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
                    <StorefrontBagDeliveryLayout
                      recipient={
                        <StorefrontBagRecipient
                          title={v.t?.recipient}
                          saved={{
                            visible: v.hasSaved,
                            label: v.t?.saved,
                            options: asList(v.savedAddresses)
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
                      }
                      location={
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
                      }
                    />
                    <DeliverySlotPicker
                      title={v.t?.when}
                      preparationNotice={v.preparationNotice}
                      review={v.deliveryReview}
                      day={{
                        label: v.t?.day,
                        error: v.dateError,
                        value: v.date,
                        onChange: v.setDate,
                        options: asList(v.days)
                      }}
                      slot={{
                        label: v.t?.slot,
                        error: v.slotError,
                        value: v.slot,
                        onChange: v.setSlot,
                        options: asList(v.slots)
                      }}
                    />
                    {v.cardsShown ? (
                      <StorefrontBagCards
                        labels={{
                          title: v.t?.cards,
                          hint: v.t?.cardHint,
                          undo: v.t.undo,
                          edit: v.t.editCard
                        }}
                        notice={{
                          message: v.cardAddedMessage,
                          undoLabel: v.undoCardLabel,
                          onUndo: v.undoCard
                        }}
                        lines={asList(v.cardLines)}
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
              <StorefrontBagSummary
                summary={{
                  title: v.t?.summary,
                  lines: v.summary,
                  sums: v.sums,
                  itemsDisclosureLabel: v.onDelivery
                    ? v.t.showItems.replace('{count}', v.fmt(v.summary.length))
                    : undefined
                }}
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
            ) : null
          }
          empty={
            v.noItems ? (
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
            ) : null
          }
        />
      }
      sticky={
        v.hasItems ? (
          <StorefrontBagSticky
            summary={{label: v.t?.total, total: v.totalLabel}}
            delivery={{visible: v.onBag, label: v.t?.toDelivery, onClick: v.toDelivery}}
            payment={{visible: v.onDelivery, label: v.t?.next, onClick: v.next}}
          />
        ) : null
      }
    />
  );
}
