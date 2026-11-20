import React from 'react';
import {Alert} from '../../../../design-system/components/Alert/Alert.jsx';
import {Dialog} from '../../../../design-system/components/Dialog/Dialog.jsx';

export function StorefrontPresentationScan({open, labels, message, videoId, onClose}) {
  return (
    <Dialog open={open} onClose={onClose} title={labels.title} maxWidth={480}>
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
        {message ? <Alert tone="warning" title={message} /> : null}
      </div>
    </Dialog>
  );
}
