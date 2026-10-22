// StorefrontCheckout: the page inside the storefront shell.
import React from 'react';
import {list} from '../app/runtime.js';
import {StorefrontCheckoutLayout} from '../app/layouts/StorefrontCheckoutLayout/StorefrontCheckoutLayout.jsx';
import {StorefrontCheckoutDeliveryReview} from '../app/organisms/StorefrontCheckoutDeliveryReview/StorefrontCheckoutDeliveryReview.jsx';
import {StorefrontCheckoutMethods} from '../app/organisms/StorefrontCheckoutMethods/StorefrontCheckoutMethods.jsx';
import {StorefrontCheckoutReceipt} from '../app/organisms/StorefrontCheckoutReceipt/StorefrontCheckoutReceipt.jsx';
import {StorefrontCheckoutSubmission} from '../app/organisms/StorefrontCheckoutSubmission/StorefrontCheckoutSubmission.jsx';
import {StorefrontCheckoutNotices} from '../app/organisms/StorefrontCheckoutNotices/StorefrontCheckoutNotices.jsx';
import {StorefrontCheckoutProgress} from '../app/organisms/StorefrontCheckoutProgress/StorefrontCheckoutProgress.jsx';
import {StorefrontCheckoutHeading} from '../app/organisms/StorefrontCheckoutHeading/StorefrontCheckoutHeading.jsx';
import {StorefrontCheckoutBank} from '../app/organisms/StorefrontCheckoutBank/StorefrontCheckoutBank.jsx';
import {StorefrontCheckoutConfirmation} from '../app/organisms/StorefrontCheckoutConfirmation/StorefrontCheckoutConfirmation.jsx';
import {StorefrontCheckoutSummary} from '../app/organisms/StorefrontCheckoutSummary/StorefrontCheckoutSummary.jsx';
import {StorefrontCheckoutSticky} from '../app/organisms/StorefrontCheckoutSticky/StorefrontCheckoutSticky.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontCheckoutLayout
            showPayment={v.paying}
            notices={
              <StorefrontCheckoutNotices
                review={{
                  visible: v.retryReview,
                  title: v.t.retryReview,
                  onReview: v.reviewRetry,
                  label: v.t.reviewRetry
                }}
                saveError={v.paymentSaveError}
              />
            }
            progress={
              v.paying ? (
                <>
                  <div className="vf-checkout-steps tw:mb-5h">
                    <StorefrontCheckoutProgress
                      steps={v.steps}
                      current={2}
                      onStepClick={v.stepClick}
                      labels={{region: v.t?.steps, done: v.t?.doneStep}}
                      formatNumber={v.fmt}
                      captionFormat={v.caption}
                    />
                  </div>
                </>
              ) : null
            }
            heading={
              v.paying ? (
                <>
                  <StorefrontCheckoutHeading title={v.t?.payA} accent={v.t?.payB} />
                </>
              ) : null
            }
            review={
              v.paying ? (
                <>
                  <StorefrontCheckoutDeliveryReview
                    labels={{title: v.t?.deliveryReview, edit: v.t?.editDelivery}}
                    edit={{href: v.backHref, onClick: v.goBack}}
                    rows={v.deliveryRows}
                  />
                </>
              ) : null
            }
            payment={
              v.paying ? (
                <>
                  <StorefrontCheckoutMethods
                    intro={v.t?.payP}
                    methods={{
                      visible: v.showMethods,
                      label: v.migration?.choose,
                      value: v.method,
                      onChange: v.setMethod,
                      options: list(v.methodOptions)
                    }}
                    unavailable={{
                      visible: v.noMethod,
                      label: v.migration?.noMethod,
                      href: v.phoneHref,
                      phoneLabel: v.phoneLabel
                    }}
                    wallet={{
                      hint: v.discountHint,
                      showTopUp: v.showTopUp,
                      topUpHref: v.topUpHref,
                      topUpLabel: v.topUpLabel,
                      selected: v.isWallet,
                      after: v.walletAfter
                    }}
                    notice={v.paymentNotice}
                  />
                  <StorefrontCheckoutReceipt
                    change={{
                      visible: v.receiptChanged,
                      text: v.receiptChangeText,
                      onConfirm: v.confirmReceipt,
                      label: v.t.confirmReceipt
                    }}
                    card={{
                      visible: v.isCard,
                      number: v.payment?.cardNumber,
                      holder: v.payment?.holder,
                      bank: v.payment?.bank,
                      amount: v.totalLabel,
                      labels: v.payLabels,
                      sheba: v.payment?.sheba
                    }}
                    sheba={{
                      label: v.t?.sheba,
                      tip: v.t?.shebaTip,
                      info: v.t?.shebaInfo,
                      onCopy: v.copySheba
                    }}
                    last4={{
                      label: v.t?.last4,
                      hint: v.t?.last4Hint,
                      error: v.last4Err,
                      value: v.last4,
                      onChange: v.setLast4
                    }}
                    reference={{
                      value: v.ref,
                      onChange: v.setRef,
                      label: v.t?.ref,
                      hint: v.t?.refHint
                    }}
                  />
                  <StorefrontCheckoutSubmission
                    whatsapp={{
                      visible: v.isWhatsapp,
                      href: v.waOrder,
                      onClick: v.openWhatsapp,
                      label: v.migration?.openWa
                    }}
                    processing={v.migration?.processing}
                    failure={{
                      visible: v.failed,
                      title: v.migration?.failed,
                      body: v.migration?.failureBody,
                      retry: {onClick: v.retry, label: v.migration?.retry},
                      other: {onClick: v.otherMethod, label: v.migration?.other}
                    }}
                    safe={v.t?.safe}
                    place={{
                      onClick: v.place,
                      loading: v.busy,
                      disabled: v.placeDisabled,
                      label: v.t?.place
                    }}
                    back={{href: v.backHref, onClick: v.goBack, label: v.t?.back}}
                  />
                </>
              ) : null
            }
            summary={
              v.paying ? (
                <>
                  <StorefrontCheckoutSummary title={v.t?.summary} lines={v.lines} sums={v.sums} />
                </>
              ) : null
            }
            bank={
              v.bankTrip ? (
                <StorefrontCheckoutBank
                  progress={{
                    steps: v.steps,
                    current: 2,
                    labels: {region: v.t?.steps, done: v.t?.doneStep},
                    formatNumber: v.fmt,
                    captionFormat: v.caption
                  }}
                  payment={{
                    status: v.bankTrip?.status,
                    amount: v.bankTrip?.amount,
                    orderNumber: v.bankTrip?.orderNumber,
                    redirect: v.bankTrip?.redirect,
                    supportHref: v.bankTrip?.supportHref
                  }}
                  actions={{retry: v.payRetry, other: v.payOther, checkAgain: v.payCheckAgain}}
                />
              ) : null
            }
            success={
              v.done ? (
                <StorefrontCheckoutConfirmation
                  progress={{
                    steps: v.steps,
                    current: 3,
                    labels: {region: v.t?.steps, done: v.t?.doneStep},
                    formatNumber: v.fmt,
                    captionFormat: v.caption
                  }}
                  heading={{
                    eyebrow: v.t?.orderNo,
                    title: v.t?.doneA,
                    accent: v.t?.doneB,
                    body: v.t?.doneP
                  }}
                  status={v.paymentStatus}
                  rows={v.doneRows}
                  account={{
                    visible: v.offerAccount,
                    title: v.t?.accountTitle,
                    body: v.accountBody,
                    href: v.href?.signin,
                    label: v.t?.accountCta
                  }}
                  links={{
                    track: {href: v.href?.track, label: v.t?.track},
                    shop: {href: v.href?.shop, label: v.t?.keep}
                  }}
                />
              ) : null
            }
          />
        </>
      }
      sticky={
        <>
          {v.paying ? (
            <>
              <StorefrontCheckoutSticky
                summary={{label: v.t?.total, value: v.totalLabel}}
                place={{
                  onClick: v.place,
                  loading: v.busy,
                  disabled: v.placeDisabled,
                  label: v.t?.place
                }}
              />
            </>
          ) : null}
        </>
      }
    />
  );
}
