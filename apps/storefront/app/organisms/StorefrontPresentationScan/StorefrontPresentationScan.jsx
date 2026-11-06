import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPresentationScan({open, labels, message, videoId, onClose}) {
  return (
    <DS.Dialog open={open} onClose={onClose} title={labels.title} maxWidth={480}>
      <div className="tw:flex tw:flex-col tw:gap-3">
        <p className="tw:m-0">
          <>{labels.body}</>
        </p>
        <video
          id={videoId}
          muted={true}
          playsInline={true}
          className="tw:w-full tw:rounded-md tw:bg-inverse tw:[aspect-ratio:4/3] tw:object-cover"
        />
        {message ? <DS.Alert tone="warning" title={message} /> : null}
      </div>
    </DS.Dialog>
  );
}
