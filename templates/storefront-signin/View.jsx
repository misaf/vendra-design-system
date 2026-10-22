// StorefrontSignin: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {StorefrontSigninLayout} from '../app/layouts/StorefrontSigninLayout/StorefrontSigninLayout.jsx';
import {StorefrontSigninHeading} from '../app/organisms/StorefrontSigninHeading/StorefrontSigninHeading.jsx';
import {StorefrontSigninPhoneControls} from '../app/organisms/StorefrontSigninPhoneControls/StorefrontSigninPhoneControls.jsx';
import {StorefrontSigninCodeControls} from '../app/organisms/StorefrontSigninCodeControls/StorefrontSigninCodeControls.jsx';
import {StorefrontSigninResend} from '../app/organisms/StorefrontSigninResend/StorefrontSigninResend.jsx';
import {StorefrontSigninPolicies} from '../app/organisms/StorefrontSigninPolicies/StorefrontSigninPolicies.jsx';
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
                  <StorefrontSigninPolicies
                    before={v.t?.terms?.before}
                    terms={{href: v.termsLink?.href, label: v.t?.terms?.terms}}
                    between={v.t?.terms?.and}
                    privacy={{href: v.privacyLink?.href, label: v.t?.terms?.privacy}}
                    after={v.t?.terms?.after}
                  />
                </>
              ) : null
            }
            code={
              v.isCode ? (
                <>
                  <StorefrontSigninHeading title={v.t?.codeA} accent={v.t?.codeB} intro={v.codeP} />
                  <StorefrontSigninCodeControls
                    problems={v.codeProblems}
                    code={{
                      label: v.t?.code,
                      value: v.code,
                      onChange: v.setCode,
                      onComplete: v.completeCode,
                      error: v.codeErr,
                      hint: v.t?.codeHint
                    }}
                    verify={{label: v.t?.verify, onClick: v.verify}}
                  />
                  <StorefrontSigninResend
                    seconds={v.resendSeconds}
                    onResend={v.resend}
                    resentText={v.resentText}
                  />
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
