import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontFaqContact({title, body, note, whatsapp, contact}) {
  return (
    <>
      <DS.Card padding={28}>
        <div className="tw:flex tw:flex-col tw:gap-4">
          <DS.Icon name="message-circle" size={28} />
          <h2>
            <>{title}</>
          </h2>
          <p className="vf-faq-answer tw:m-0 tw:text-quiet tw:leading-body">
            <>{body}</>
          </p>
          <div className="tw:flex tw:gap-3 tw:flex-wrap">
            {whatsapp ? (
              <DS.Button
                variant="primary"
                iconStart="message-circle"
                href={whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <>{whatsapp.label}</>
              </DS.Button>
            ) : null}
            <DS.Button variant="ghost" href={contact.href}>
              <>{contact.label}</>
            </DS.Button>
          </div>
        </div>
      </DS.Card>
      <p className="vf-faq-note tw:m-0 tw:text-sm tw:leading-body tw:text-quiet">
        <>{note}</>
      </p>
    </>
  );
}
