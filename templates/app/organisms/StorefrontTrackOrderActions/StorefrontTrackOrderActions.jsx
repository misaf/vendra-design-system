import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontTrackOrderActions({contact, repeat, lookup}) {
  return (
    <div className="tw:flex tw:gap-3 tw:flex-wrap">
      {contact ? (
        <DS.Button
          variant="primary"
          iconStart="message-circle"
          href={contact.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <>{contact.label}</>
        </DS.Button>
      ) : null}
      <DS.Button
        variant="secondary"
        iconStart="rotate-ccw"
        href={repeat.href}
        onClick={repeat.onClick}
      >
        <>{repeat.label}</>
      </DS.Button>
      <DS.Button variant="ghost" iconStart="package-search" onClick={lookup.onClick}>
        <>{lookup.label}</>
      </DS.Button>
    </div>
  );
}
