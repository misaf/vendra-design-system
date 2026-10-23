// StorefrontSignin: the page inside the storefront shell.
import React from 'react';
import {StorefrontSigninLayout} from '../app/layouts/StorefrontSigninLayout/StorefrontSigninLayout.jsx';
import {StorefrontSigninHeading} from '../app/organisms/StorefrontSigninHeading/StorefrontSigninHeading.jsx';
import {StorefrontSigninPhoneControls} from '../app/organisms/StorefrontSigninPhoneControls/StorefrontSigninPhoneControls.jsx';
import {StorefrontSigninCodeControls} from '../app/organisms/StorefrontSigninCodeControls/StorefrontSigninCodeControls.jsx';
import {StorefrontSigninResend} from '../app/organisms/StorefrontSigninResend/StorefrontSigninResend.jsx';
import {StorefrontSigninPolicies} from '../app/organisms/StorefrontSigninPolicies/StorefrontSigninPolicies.jsx';
import {StorefrontSigninCompletion} from '../app/organisms/StorefrontSigninCompletion/StorefrontSigninCompletion.jsx';
import {StorefrontSigninChangeNumber} from '../app/organisms/StorefrontSigninChangeNumber/StorefrontSigninChangeNumber.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
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
                <StorefrontSigninChangeNumber label={v.t?.change} onChangeNumber={v.back} />
              </>
            ) : null
          }
          feedback={
            v.isOk ? (
              <StorefrontSigninCompletion
                title={v.t?.okA}
                accent={v.okName}
                body={v.t?.okP}
                fromCheckout={v.fromCheckout}
                notFromCheckout={v.notFromCheckout}
                checkout={{
                  href: v.checkoutHref,
                  onClick: v.backToCheckout,
                  label: v.t?.backToCheckout
                }}
                account={{href: v.href?.account, label: v.t?.toAccount}}
              />
            ) : null
          }
        />
      }
      sticky={<></>}
    />
  );
}
