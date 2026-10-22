// StorefrontSignin: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {StorefrontSigninLayout} from '../app/layouts/StorefrontSigninLayout/StorefrontSigninLayout.jsx';
import {StorefrontSigninHeading} from '../app/organisms/StorefrontSigninHeading/StorefrontSigninHeading.jsx';
import {StorefrontSigninPhoneControls} from '../app/organisms/StorefrontSigninPhoneControls/StorefrontSigninPhoneControls.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontSigninLayout
            phone={
              v.isPhone ? (
                <>
                  <StorefrontSigninHeading title={v.t?.inA} accent={v.t?.inB} intro={v.t?.inP} />
                  <StorefrontSigninPhoneControls
                    problems={v.phoneProblems}
                    phone={{
                      label: v.t?.phone,
                      value: v.phone,
                      onChange: v.setPhone,
                      error: v.phoneErr
                    }}
                    send={{label: v.t?.send, onClick: v.send}}
                  />
                  <p className="vf-signin-note tw:m-0 tw:text-sm tw:leading-body tw:text-quiet">
                    <>{v.t?.terms?.before}</>
                    <a
                      href={v.termsLink?.href}
                      className="tw:text-inherit! tw:[text-underline-offset:3px]"
                    >
                      <>{v.t?.terms?.terms}</>
                    </a>
                    <>{v.t?.terms?.and}</>
                    <a
                      href={v.privacyLink?.href}
                      className="tw:text-inherit! tw:[text-underline-offset:3px]"
                    >
                      <>{v.t?.terms?.privacy}</>
                    </a>
                    <>{v.t?.terms?.after}</>
                  </p>
                </>
              ) : null
            }
            code={
              v.isCode ? (
                <>
                  <StorefrontSigninHeading title={v.t?.codeA} accent={v.t?.codeB} intro={v.codeP} />
                  <DS.ErrorSummary id="vf-code-errors" errors={v.codeProblems} />
                  <DS.CodeInput
                    id="vf-code"
                    label={v.t?.code}
                    value={v.code}
                    length={5}
                    onChange={v.setCode}
                    onComplete={v.completeCode}
                    error={v.codeErr}
                    hint={v.t?.codeHint}
                  />
                  <DS.Button variant="primary" size="lg" block={true} onClick={v.verify}>
                    <>{v.t?.verify}</>
                  </DS.Button>
                  <div className="vf-signin-resend tw:flex tw:flex-col tw:gap-2 tw:items-start">
                    <DS.ResendCode seconds={v.resendSeconds} onResend={v.resend} />
                    <p role="status" className="tw:m-0 tw:text-sm">
                      <>{v.resentText}</>
                    </p>
                  </div>
                  <DS.Button variant="ghost" iconStart="arrow-left" onClick={v.back}>
                    <>{v.t?.change}</>
                  </DS.Button>
                </>
              ) : null
            }
            feedback={
              v.isOk ? (
                <>
                  <DS.EmptyState
                    icon="check"
                    tone="accent"
                    title={v.t?.okA}
                    titleAccent={v.okName}
                    body={v.t?.okP}
                    headingLevel={1}
                  />
                  <div className="tw:flex tw:justify-center tw:gap-3 tw:flex-wrap">
                    {v.fromCheckout ? (
                      <>
                        <DS.Button
                          variant="primary"
                          iconEnd="arrow-right"
                          href={v.checkoutHref}
                          onClick={v.backToCheckout}
                        >
                          <>{v.t?.backToCheckout}</>
                        </DS.Button>
                        <DS.Button variant="ghost" href={v.href?.account}>
                          <>{v.t?.toAccount}</>
                        </DS.Button>
                      </>
                    ) : null}
                    {v.notFromCheckout ? (
                      <>
                        <DS.Button variant="primary" href={v.href?.account}>
                          <>{v.t?.toAccount}</>
                        </DS.Button>
                      </>
                    ) : null}
                  </div>
                </>
              ) : null
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
