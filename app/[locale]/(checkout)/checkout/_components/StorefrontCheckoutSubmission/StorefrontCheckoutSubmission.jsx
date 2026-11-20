import React from 'react';
import {Alert} from '../../../../../../ui/components/Alert/Alert.jsx';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';

export function StorefrontCheckoutSubmission({whatsapp, processing, failure, safe, place, back}) {
  return (
    <>
      {whatsapp.visible ? (
        <>
          <Button
            variant="secondary"
            href={whatsapp.href}
            onClick={whatsapp.onClick}
            target="_blank"
            rel="noopener noreferrer"
          >
            <>{whatsapp.label}</>
          </Button>
        </>
      ) : null}
      {place.loading ? (
        <>
          <p role="status">
            <>{processing}</>
          </p>
        </>
      ) : null}
      {failure.visible ? (
        <>
          <div id="vf-checkout-submit-error" tabIndex={-1} data-vf-keep-focus>
            <Alert tone="danger" title={failure.title}>
              <>{failure.body}</>
            </Alert>
          </div>
          <div className="tw:flex tw:gap-3">
            <Button onClick={failure.retry.onClick}>
              <>{failure.retry.label}</>
            </Button>
            {failure.other ? (
              <Button variant="ghost" onClick={failure.other.onClick}>
                <>{failure.other.label}</>
              </Button>
            ) : null}
          </div>
        </>
      ) : null}
      <Alert tone="neutral" icon="shield-check">
        <>{safe}</>
      </Alert>
      <div className="tw:flex tw:gap-3 tw:flex-wrap">
        <div className="tw:contents tw:max-md:hidden">
          <Button
            variant="primary"
            size="lg"
            iconEnd="arrow-right"
            onClick={place.onClick}
            loading={place.loading}
            disabled={place.disabled}
          >
            <>{place.label}</>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="lg"
          iconStart="arrow-left"
          href={back.href}
          onClick={back.onClick}
        >
          <>{back.label}</>
        </Button>
      </div>
    </>
  );
}
