// StorefrontCheckout: the page inside the storefront shell.
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
          <main id="main" tabIndex={-1} className="vf-form tw:mx-auto">
            {v.paying ? (
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
                <div className="vf-checkout-heading tw:mb-6">
                  <h1>
                    <>{v.t?.payA} </>
                    <em className="vf-checkout-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                      <>{v.t?.payB}</>
                    </em>
                  </h1>
                </div>
                <div className="vf-checkout-columns tw:flex tw:flex-wrap tw:gap-7 tw:items-start">
                  <div className="vf-checkout-payment tw:min-w-0 tw:flex tw:flex-col tw:gap-5 tw:[flex:999_1_440px]">
                    <p className="vf-checkout-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
                      <>{v.t?.payP}</>
                    </p>
                    {v.showMethods ? (
                      <>
                        <DS.RadioGroup
                          className="vf-checkout-methods"
                          legend={v.migration?.choose}
                          name="vf-pay-method"
                          value={v.method}
                          onChange={v.setMethod}
                        >
                          {list(v.methodOptions).map((o, $index) => (
                            <React.Fragment key={$index}>
                              <DS.Radio
                                value={o?.value}
                                label={o?.label}
                                description={o?.description}
                                disabled={o?.disabled}
                              />
                            </React.Fragment>
                          ))}
                        </DS.RadioGroup>
                      </>
                    ) : null}
                    {v.noMethod ? (
                      <>
                        <DS.Alert
                          tone="warning"
                          title={v.migration?.noMethod}
                          action={
                            <DS.Button
                              size="sm"
                              variant="secondary"
                              iconStart="phone"
                              href={v.phoneHref}
                            >
                              <>{v.phoneLabel}</>
                            </DS.Button>
                          }
                        />
                      </>
                    ) : null}
                    {v.discountHint ? (
                      <>
                        <p className="vf-checkout-wallet-hint tw:m-0 tw:text-sm">
                          <>{v.discountHint}</>
                        </p>
                      </>
                    ) : null}
                    {v.showTopUp ? (
                      <>
                        <div>
                          <DS.Button
                            variant="secondary"
                            size="sm"
                            iconStart="banknote"
                            href={v.topUpHref}
                          >
                            <>{v.topUpLabel}</>
                          </DS.Button>
                        </div>
                      </>
                    ) : null}
                    {v.isWallet ? (
                      <>
                        <p className="vf-checkout-wallet-after tw:m-0 tw:text-sm tw:font-medium">
                          <>{v.walletAfter}</>
                        </p>
                      </>
                    ) : null}
                    <p className="tw:text-sm tw:text-quiet">
                      <>{v.paymentNotice}</>
                    </p>
                    {v.isCard ? (
                      <>
                        <DS.PaymentCard
                          cardNumber={v.payment?.cardNumber}
                          holder={v.payment?.holder}
                          bank={v.payment?.bank}
                          amount={v.totalLabel}
                          labels={v.payLabels}
                        />
                        {v.payment?.sheba ? (
                          <>
                            <p className="vf-checkout-sheba tw:text-sm tw:flex tw:items-center tw:gap-1 tw:flex-wrap tw:m-0">
                              <>
                                {v.t?.sheba}
                                {': '}
                              </>
                              <bdi dir="ltr">
                                <>{v.payment?.sheba}</>
                              </bdi>
                              <DS.Tooltip content={v.t?.shebaTip}>
                                <button
                                  type="button"
                                  className="vf-checkout-info tw:inline-grid tw:place-items-center tw:size-[44px] tw:-my-2 tw:p-0 tw:[border:0] tw:bg-transparent tw:text-quiet tw:cursor-pointer tw:rounded-full"
                                  aria-label={v.t?.shebaInfo}
                                >
                                  <DS.Icon name="info" size={16} />
                                </button>
                              </DS.Tooltip>
                            </p>
                            <DS.Button variant="ghost" size="sm" onClick={v.copySheba}>
                              <>{v.payLabels?.copy}</>
                            </DS.Button>
                          </>
                        ) : null}
                        <div className="vf-checkout-receipt-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
                          <DS.Input
                            id="vf-last4"
                            label={v.t?.last4}
                            hint={v.t?.last4Hint}
                            error={v.last4Err}
                            inputMode="numeric"
                            maxLength={4}
                            dir="ltr"
                            value={v.last4}
                            onChange={v.setLast4}
                          />
                          <DS.Input
                            id="vf-ref"
                            value={v.ref}
                            onChange={v.setRef}
                            label={v.t?.ref}
                            hint={v.t?.refHint}
                            inputMode="numeric"
                            dir="ltr"
                          />
                        </div>
                      </>
                    ) : null}
                    {v.isWhatsapp ? (
                      <>
                        <DS.Button
                          variant="secondary"
                          href={v.waOrder}
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
                  </div>
                  <aside className="vf-checkout-summary tw:[flex:1_1_360px] tw:max-w-form vf-sticky-panel">
                    <DS.Card padding={20}>
                      <DS.OrderSummary title={v.t?.summary} lines={v.lines} sums={v.sums} />
                    </DS.Card>
                  </aside>
                </div>
              </>
            ) : null}
            {v.bankTrip ? (
              <div className="vf-checkout-bank tw:mx-auto tw:flex tw:flex-col tw:items-center tw:max-w-prose tw:gap-5h">
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
              </div>
            ) : null}
            {v.done ? (
              <>
                <div className="vf-checkout-success tw:mx-auto tw:flex tw:flex-col tw:items-center tw:max-w-prose tw:gap-5h">
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
                </div>
              </>
            ) : null}
          </main>
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
