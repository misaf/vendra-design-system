import React from 'react';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {Card} from '../../../../../../components/ui/patterns/atoms/Card/Card.jsx';
import {Icon} from '../../../../../../components/ui/components/Icon/Icon.jsx';

export function StorefrontFaqContact({title, body, note, whatsapp, contact}) {
  return (
    <>
      <Card padding={28}>
        <div className="tw:flex tw:flex-col tw:gap-4">
          <Icon name="message-circle" size={28} />
          <h2>
            <>{title}</>
          </h2>
          <p className="vf-faq-answer tw:m-0 tw:text-quiet tw:leading-body">
            <>{body}</>
          </p>
          <div className="tw:flex tw:gap-3 tw:flex-wrap">
            {whatsapp ? (
              <Button
                variant="primary"
                iconStart="message-circle"
                href={whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <>{whatsapp.label}</>
              </Button>
            ) : null}
            <Button variant="ghost" href={contact.href}>
              <>{contact.label}</>
            </Button>
          </div>
        </div>
      </Card>
      <p className="vf-faq-note tw:m-0 tw:text-sm tw:leading-body tw:text-quiet">
        <>{note}</>
      </p>
    </>
  );
}
