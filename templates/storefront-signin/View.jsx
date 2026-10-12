// StorefrontSignin: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main id="main" tabIndex="-1" className="vf-form tw:mx-auto">
            <div className="vf-form-narrow tw:flex tw:flex-col tw:gap-5 tw:max-w-[420px] tw:mx-auto">
              {v.isPhone ? (
                <>
                  <h1>
                    <>{v.t?.inA} </>
                    <em className="vf-signin-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                      <>{v.t?.inB}</>
                    </em>
                  </h1>
                  <p className="vf-signin-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
                    <>{v.t?.inP}</>
                  </p>
                  <DS.PhoneInput
                    id="vf-phone"
                    label={v.t?.phone}
                    placeholder="0912 000 0000"
                    value={v.phone}
                    onChange={v.setPhone}
                    error={v.phoneErr}
                  />
                  <DS.Button variant="primary" size="lg" block={true} onClick={v.send}>
                    <>{v.t?.send}</>
                  </DS.Button>
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
              ) : null}
              {v.isCode ? (
                <>
                  <h1>
                    <>{v.t?.codeA} </>
                    <em className="vf-signin-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                      <>{v.t?.codeB}</>
                    </em>
                  </h1>
                  <p className="vf-signin-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
                    <>{v.codeP}</>
                  </p>
                  <DS.CodeInput
                    id="vf-code"
                    label={v.t?.code}
                    value={v.code}
                    length={5}
                    onChange={v.setCode}
                    error={v.codeErr}
                    hint={v.t?.codeHint}
                  />
                  <DS.Button variant="primary" size="lg" block={true} onClick={v.verify}>
                    <>{v.t?.verify}</>
                  </DS.Button>
                  <div className="vf-signin-resend tw:flex tw:flex-col tw:gap-2 tw:items-start">
                    {v.waiting ? (
                      <>
                        <p className="tw:m-0 tw:text-sm tw:text-quiet">
                          <>{v.resendIn}</>
                        </p>
                      </>
                    ) : null}
                    {v.canResend ? (
                      <>
                        <DS.Button variant="secondary" iconStart="rotate-ccw" onClick={v.resend}>
                          <>{v.t?.resend}</>
                        </DS.Button>
                      </>
                    ) : null}
                    <p role="status" className="tw:m-0 tw:text-sm">
                      <>{v.resentText}</>
                    </p>
                  </div>
                  <DS.Button variant="ghost" iconStart="arrow-left" onClick={v.back}>
                    <>{v.t?.change}</>
                  </DS.Button>
                </>
              ) : null}
              {v.isOk ? (
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
              ) : null}
            </div>
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
