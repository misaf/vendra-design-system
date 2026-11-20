// StorefrontWeddings: the page inside the storefront shell.
import React from 'react';
import {Alert} from '../../../design-system/components/Alert/Alert.jsx';
import {ArchFrame} from '../../../design-system/components/ArchFrame/ArchFrame.jsx';
import {asList} from '../../shell/ui/as-list.js';
import {StorefrontWeddingsLayout} from './components/StorefrontWeddingsLayout/StorefrontWeddingsLayout.jsx';
import {StorefrontWeddingsHeading} from './components/StorefrontWeddingsHeading/StorefrontWeddingsHeading.jsx';
import {StorefrontWeddingsServices} from './components/StorefrontWeddingsServices/StorefrontWeddingsServices.jsx';
import {StorefrontWeddingsStory} from './components/StorefrontWeddingsStory/StorefrontWeddingsStory.jsx';
import {StorefrontWeddingsInquiryIntro} from './components/StorefrontWeddingsInquiryIntro/StorefrontWeddingsInquiryIntro.jsx';
import {StorefrontWeddingsFormControls} from './components/StorefrontWeddingsFormControls/StorefrontWeddingsFormControls.jsx';
import {StorefrontWeddingsCompletion} from './components/StorefrontWeddingsCompletion/StorefrontWeddingsCompletion.jsx';
import {Shell} from '../../shell/components/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontWeddingsLayout
          heading={
            <StorefrontWeddingsHeading
              eyebrow={v.t?.eb}
              title={v.t?.hA}
              accent={v.t?.hB}
              intro={v.t?.hP}
              plan={{label: v.t?.plan, href: '#inquiry'}}
              whatsapp={v.waHref ? {label: v.t?.wa, href: v.waHref} : null}
            />
          }
          heroMedia={<ArchFrame ratio="4/5" placeholderLabel={v.t?.ph} alt="" />}
          services={<StorefrontWeddingsServices services={asList(v.services)} />}
          story={
            <StorefrontWeddingsStory
              galleryTitle={v.t?.galleryTitle}
              gallery={asList(v.gallery)}
              processTitle={v.t?.processTitle}
              process={asList(v.process)}
            />
          }
          inquiryIntro={<StorefrontWeddingsInquiryIntro title={v.t?.fA} intro={v.t?.fP} />}
          inquiry={
            <>
              {v.notSent ? (
                <StorefrontWeddingsFormControls
                  problems={v.problems}
                  name={{
                    label: v.t?.name,
                    value: v.name,
                    onChange: v.setName,
                    error: v.nameErr
                  }}
                  email={{
                    label: v.t?.emailLabel,
                    value: v.email,
                    onChange: v.setEmail,
                    error: v.emailErr
                  }}
                  phone={{
                    label: v.t?.phone,
                    value: v.phone,
                    onChange: v.setPhone,
                    error: v.phoneErr
                  }}
                  event={{
                    label: v.t?.type,
                    value: v.type,
                    onChange: v.setType,
                    options: v.types
                  }}
                  guests={{label: v.t?.guests, value: v.guests, onChange: v.setGuests}}
                  date={{
                    label: v.t?.date,
                    value: v.wDate,
                    onChange: v.setWDate,
                    lang: v.lang,
                    minDate: v.today
                  }}
                  budget={{
                    label: v.t?.budget,
                    value: v.budget,
                    onChange: v.setBudget,
                    options: v.budgets
                  }}
                  message={{
                    label: v.t?.msg,
                    hint: v.t?.msgHint,
                    value: v.notes,
                    onChange: v.setNotes,
                    error: v.msgErr
                  }}
                  send={{label: v.t?.send, onClick: v.send, busy: v.busy}}
                />
              ) : null}
              {v.sent ? (
                <StorefrontWeddingsCompletion
                  title={v.t?.okT}
                  body={v.t?.okP}
                  edit={{label: v.t?.editMessage, onClick: v.editMessage}}
                />
              ) : null}
            </>
          }
          feedback={
            v.apiError ? (
              <div id="vf-wedding-api-error" tabIndex={-1} data-vf-keep-focus>
                <Alert tone="danger" title={v.apiError} />
              </div>
            ) : null
          }
        />
      }
      sticky={<></>}
    />
  );
}
