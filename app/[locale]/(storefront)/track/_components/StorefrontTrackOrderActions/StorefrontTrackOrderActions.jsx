import React from 'react';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';

export function StorefrontTrackOrderActions({contact, repeat, lookup}) {
  return (
    <div className="tw:flex tw:gap-3 tw:flex-wrap">
      {contact ? (
        <Button
          variant="primary"
          iconStart="message-circle"
          href={contact.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <>{contact.label}</>
        </Button>
      ) : null}
      {repeat ? (
        <Button
          variant="secondary"
          iconStart="rotate-ccw"
          href={repeat.href}
          onClick={repeat.onClick}
        >
          <>{repeat.label}</>
        </Button>
      ) : null}
      <Button variant="ghost" iconStart="package-search" onClick={lookup.onClick}>
        <>{lookup.label}</>
      </Button>
    </div>
  );
}
