import React from 'react';
import * as DS from '../../ds.js';
import {vfQrPath} from '../../../_shared/qr.js';

function Qr({text, label}) {
  const {path, size} = React.useMemo(() => vfQrPath(text), [text]);
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={'0 0 ' + size + ' ' + size}
      shapeRendering="crispEdges"
      className="vf-presentation-qr tw:block tw:w-full tw:max-w-media tw:mx-auto tw:rounded-md"
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
}

export function StorefrontPresentationSend({send, labels, onClose}) {
  return (
    <DS.Dialog open={!!send} onClose={onClose} title={send?.title} maxWidth={420}>
      {send ? (
        <div className="tw:flex tw:flex-col tw:gap-4">
          {send.tooLong ? <DS.Alert tone="warning" title={send.tooLongBody} /> : null}
          <div className="vf-presentation-tag tw:flex tw:flex-col tw:items-center tw:gap-2">
            {send.tooLong ? null : <Qr text={send.url} label={send.qrLabel} />}
            {send.code ? (
              <span className="tw:font-display tw:text-xl tw:tracking-display" dir="ltr">
                <>{send.code}</>
              </span>
            ) : null}
          </div>
          {send.tooLong ? null : (
            <p className="tw:m-0">
              <>{send.body}</>
            </p>
          )}
          <div className="tw:flex tw:gap-3 tw:flex-wrap">
            {send.tooLong ? null : (
              <DS.Button
                variant="secondary"
                iconStart="message-circle"
                href={send.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <>{labels.whatsapp}</>
              </DS.Button>
            )}
            {send.canCopy && !send.tooLong ? (
              <DS.Button variant="secondary" iconStart="copy" onClick={send.copy}>
                <>{send.copied ? labels.copied : labels.copy}</>
              </DS.Button>
            ) : null}
            {send.tag ? (
              <DS.Button variant="secondary" iconStart="tag" onClick={send.print}>
                <>{labels.printTag}</>
              </DS.Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </DS.Dialog>
  );
}
