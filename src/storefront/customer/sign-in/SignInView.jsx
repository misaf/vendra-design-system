// StorefrontSignin: the page inside the storefront shell.
import React from 'react';
import {Button} from '../../../design-system/components/Button/Button.jsx';
import {StorefrontSigninLayout} from './components/StorefrontSigninLayout/StorefrontSigninLayout.jsx';
import {StorefrontPageHeading} from '../../shell/components/StorefrontPageHeading/StorefrontPageHeading.jsx';
import {StorefrontSigninPhoneControls} from './components/StorefrontSigninPhoneControls/StorefrontSigninPhoneControls.jsx';
import {StorefrontSigninCodeControls} from './components/StorefrontSigninCodeControls/StorefrontSigninCodeControls.jsx';
import {StorefrontSigninResend} from './components/StorefrontSigninResend/StorefrontSigninResend.jsx';
import {StorefrontSigninPolicies} from './components/StorefrontSigninPolicies/StorefrontSigninPolicies.jsx';
import {StorefrontSigninCompletion} from './components/StorefrontSigninCompletion/StorefrontSigninCompletion.jsx';
import {Shell} from '../../shell/components/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontSigninLayout
          phone={
            v.isPhone ? (
              <>
                <StorefrontPageHeading title={v.t?.inA} accent={v.t?.inB} intro={v.t?.inP} />
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
                <StorefrontPageHeading title={v.t?.codeA} accent={v.t?.codeB} intro={v.codeP} />
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
                <Button variant="ghost" iconStart="arrow-left" onClick={v.back}>
                  {v.t?.change}
                </Button>
              </>
            ) : null
          }
          feedback={
            v.isOk ? (
              <StorefrontSigninCompletion
                title={v.okTitle}
                accent={v.okAccent}
                body={v.t?.okP}
                fromCheckout={v.fromCheckout}
                notFromCheckout={v.notFromCheckout}
                checkout={{
                  href: v.checkoutHref,
                  onClick: v.backToCheckout,
                  label: v.t?.backToCheckout
                }}
                account={{href: v.href?.account, label: v.t?.toAccount}}
                namePrompt={v.namePrompt}
              />
            ) : null
          }
        />
      }
      sticky={<></>}
    />
  );
}
