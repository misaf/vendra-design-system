// StorefrontFaq: the page inside the storefront shell.
import React from 'react';
import {asList} from '../../shared/ui/as-list.js';
import {StorefrontFaqLayout} from './layouts/StorefrontFaqLayout/StorefrontFaqLayout.jsx';
import {StorefrontPageHeading} from '../../shell/molecules/StorefrontPageHeading/StorefrontPageHeading.jsx';
import {StorefrontFaqQuestions} from './organisms/StorefrontFaqQuestions/StorefrontFaqQuestions.jsx';
import {StorefrontFaqContact} from './organisms/StorefrontFaqContact/StorefrontFaqContact.jsx';
import {Shell} from '../../shell/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontFaqLayout
          heading={
            <StorefrontPageHeading
              variant="info"
              eyebrow={v.t?.eyebrow}
              title={v.t?.titleA}
              accent={v.t?.titleB}
              intro={v.t?.intro}
            />
          }
          questions={<StorefrontFaqQuestions groups={asList(v.groups)} />}
          contact={
            <StorefrontFaqContact
              title={v.t?.helpTitle}
              body={v.t?.helpBody}
              note={v.t?.sample}
              whatsapp={v.waHref ? {href: v.waHref, label: v.t?.whatsapp} : null}
              contact={{href: v.href?.contact, label: v.t?.contactUs}}
            />
          }
        />
      }
      sticky={<></>}
    />
  );
}
