// StorefrontCheckout: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontCheckoutLayout} from '../app/layouts/StorefrontCheckoutLayout/StorefrontCheckoutLayout.jsx';
import {StorefrontCheckoutDeliveryReview} from '../app/organisms/StorefrontCheckoutDeliveryReview/StorefrontCheckoutDeliveryReview.jsx';
import {StorefrontCheckoutMethods} from '../app/organisms/StorefrontCheckoutMethods/StorefrontCheckoutMethods.jsx';
import {StorefrontCheckoutReceipt} from '../app/organisms/StorefrontCheckoutReceipt/StorefrontCheckoutReceipt.jsx';
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
              <>
                {v.retryReview && (
                  <div id="vf-payment-review" tabIndex={-1}>
                    <DS.Alert
                      tone="warning"
                      title={v.t.retryReview}
                      action={
                        <DS.Button variant="secondary" onClick={v.reviewRetry}>
                          {v.t.reviewRetry}
                        </DS.Button>
                      }
                    />
                  </div>
                )}
                {v.paymentSaveError && <DS.Alert tone="danger" title={v.paymentSaveError} />}
              </>
            }
            progress={
              v.paying ? (
                <>
                  <div className="vf-checkout-steps tw:mb-5h">
                    <div className="tw:md:hidden">
                      <DS.Stepper
                        label={v.t?.steps}
                        steps={v.steps}
                        current={2}
                        onStepClick={v.stepClick}
                        doneLabel={v.t?.doneStep}
                        formatNumber={v.fmt}
                        captionFormat={v.caption}

                        compact={true}
                      />
                    </div>
                    <div className="tw:max-md:hidden">
                      <DS.Stepper
                        label={v.t?.steps}
                        steps={v.steps}
                        current={2}
                        onStepClick={v.stepClick}
                        doneLabel={v.t?.doneStep}
                        formatNumber={v.fmt}
                        captionFormat={v.caption}
                      />
                    </div>
                  </div>
                </>
              ) : null
            }
            heading={
              v.paying ? (
                <>
                  <div className="vf-checkout-heading tw:mb-6">
                    <h1>
                      <>{v.t?.payA} </>
                      <em className="vf-checkout-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                        <>{v.t?.payB}</>
                      </em>
                    </h1>
                  </div>
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
                  {v.isWhatsapp ? (
                    <>
                      <DS.Button
                        variant="secondary"
                        href={v.waOrder}
                        onClick={v.openWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <>{v.migration?.openWa}</>
                      </DS.Button>
                    </>
                  ) : null}
                  {v.busy ? (
                    <>
                      <p role="status">
                        <>{v.migration?.processing}</>
                      </p>
                    </>
                  ) : null}
                  {v.failed ? (
                    <>
                      <DS.Alert tone="danger" title={v.migration?.failed}>
                        <>{v.migration?.failureBody}</>
                      </DS.Alert>
                      <div className="tw:flex tw:gap-3">
                        <DS.Button onClick={v.retry}>
                          <>{v.migration?.retry}</>
                        </DS.Button>
                        <DS.Button variant="ghost" onClick={v.otherMethod}>
                          <>{v.migration?.other}</>
                        </DS.Button>
                      </div>
                    </>
                  ) : null}
                  <DS.Alert tone="neutral" icon="shield-check">
                    <>{v.t?.safe}</>
                  </DS.Alert>
                  <div className="tw:flex tw:gap-3 tw:flex-wrap">
                    <div className="tw:contents tw:max-md:hidden">
                      <DS.Button
                        variant="primary"
                        size="lg"
                        iconEnd="arrow-right"
                        onClick={v.place}
                        loading={v.busy}
                        disabled={v.placeDisabled}
                      >
                        <>{v.t?.place}</>
                      </DS.Button>
                    </div>
                    <DS.Button
                      variant="ghost"
                      size="lg"
                      iconStart="arrow-left"
                      href={v.backHref}
                      onClick={v.goBack}
                    >
                      <>{v.t?.back}</>
                    </DS.Button>
                  </div>
                </>
              ) : null
            }
            summary={
              v.paying ? (
                <>
                  <DS.Card padding={20}>
                    <DS.OrderSummary title={v.t?.summary} lines={v.lines} sums={v.sums} />
                  </DS.Card>
                </>
              ) : null
            }
            bank={
              v.bankTrip ? (
                <>
                  <div className="tw:md:hidden">
                    <DS.Stepper
                      label={v.t?.steps}
                      steps={v.steps}
                      current={2}
                      doneLabel={v.t?.doneStep}
                      formatNumber={v.fmt}
                      captionFormat={v.caption}

                      compact={true}
                    />
                  </div>
                  <div className="tw:max-md:hidden">
                    <DS.Stepper
                      label={v.t?.steps}
                      steps={v.steps}
                      current={2}
                      doneLabel={v.t?.doneStep}
                      formatNumber={v.fmt}
                      captionFormat={v.caption}
                    />
                  </div>
                  <DS.PaymentStatus
                    status={v.bankTrip?.status}
                    amount={v.bankTrip?.amount}
                    orderNumber={v.bankTrip?.orderNumber}
                    redirect={v.bankTrip?.redirect}
                    supportHref={v.bankTrip?.supportHref}
                    onRetry={v.payRetry}
                    onOtherMethod={v.payOther}
                    onCheckAgain={v.payCheckAgain}
                    headingLevel={1}
                  />
                </>
              ) : null
            }
            success={
              v.done ? (
                <>
                  <div className="tw:md:hidden">
                    <DS.Stepper
                      label={v.t?.steps}
                      steps={v.steps}
                      current={3}
                      doneLabel={v.t?.doneStep}
                      formatNumber={v.fmt}
                      captionFormat={v.caption}

                      compact={true}
                    />
                  </div>
                  <div className="tw:max-md:hidden">
                    <DS.Stepper
                      label={v.t?.steps}
                      steps={v.steps}
                      current={3}
                      doneLabel={v.t?.doneStep}
                      formatNumber={v.fmt}
                      captionFormat={v.caption}
                    />
                  </div>
                  <DS.EmptyState
                    icon="check"
                    tone="accent"
                    eyebrow={v.t?.orderNo}
                    title={v.t?.doneA}
                    titleAccent={v.t?.doneB}
                    body={v.t?.doneP}
                    headingLevel={1}
                  />
                  <DS.Badge tone="accent">
                    <>{v.paymentStatus}</>
                  </DS.Badge>
                  <div className="tw:w-full">
                    <DS.DetailList rows={v.doneRows} />
                  </div>
                  {v.offerAccount ? (
                    <>
                      <div className="tw:w-full">
                        <DS.Card variant="sunken" padding={20}>
                          <div className="vf-checkout-account tw:flex tw:items-center tw:justify-between tw:gap-4 tw:flex-wrap">
                            <div className="tw:flex tw:flex-col tw:gap-1 tw:[flex:1_1_260px]">
                              <h2 className="tw:m-0 tw:text-md tw:font-medium">
                                <>{v.t?.accountTitle}</>
                              </h2>
                              <p className="tw:m-0 tw:text-sm tw:text-secondary">
                                <>{v.accountBody}</>
                              </p>
                            </div>
                            <DS.Button variant="secondary" iconStart="user" href={v.href?.signin}>
                              <>{v.t?.accountCta}</>
                            </DS.Button>
                          </div>
                        </DS.Card>
                      </div>
                    </>
                  ) : null}
                  <div className="tw:flex tw:gap-3 tw:flex-wrap tw:justify-center">
                    <DS.Button variant="primary" iconStart="package-search" href={v.href?.track}>
                      <>{v.t?.track}</>
                    </DS.Button>
                    <DS.Button variant="secondary" href={v.href?.shop}>
                      <>{v.t?.keep}</>
                    </DS.Button>
                  </div>
                </>
              ) : null
            }
          />
        </>
      }
      sticky={
        <>
          {v.paying ? (
            <>
              <div className="vf-mobile-action tw:flex tw:items-center tw:gap-3 tw:py-3 tw:px-4 tw:bg-card tw:[border-top:1px_solid_var(--border-subtle)]">
                <div className="vf-action-total">
                  <span className="vf-action-caption tw:text-xs tw:text-quiet">
                    <>{v.t?.total}</>
                  </span>
                  <DS.Price value={v.totalLabel} size="md" className="vf-price" />
                </div>
                <DS.Button
                  variant="primary"
                  iconEnd="arrow-right"
                  onClick={v.place}
                  loading={v.busy}
                  disabled={v.placeDisabled}
                >
                  <>{v.t?.place}</>
                </DS.Button>
              </div>
            </>
          ) : null}
        </>
      }
    />
  );
}
