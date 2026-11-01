// StorefrontWeddings: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontWeddingsLayout} from '../app/layouts/StorefrontWeddingsLayout/StorefrontWeddingsLayout.jsx';
import {StorefrontWeddingsHeading} from '../app/organisms/StorefrontWeddingsHeading/StorefrontWeddingsHeading.jsx';
import {StorefrontWeddingsHeroMedia} from '../app/organisms/StorefrontWeddingsHeroMedia/StorefrontWeddingsHeroMedia.jsx';
import {StorefrontWeddingsServices} from '../app/organisms/StorefrontWeddingsServices/StorefrontWeddingsServices.jsx';
import {StorefrontWeddingsStory} from '../app/organisms/StorefrontWeddingsStory/StorefrontWeddingsStory.jsx';
import {StorefrontWeddingsInquiryIntro} from '../app/organisms/StorefrontWeddingsInquiryIntro/StorefrontWeddingsInquiryIntro.jsx';
import {StorefrontWeddingsFormControls} from '../app/organisms/StorefrontWeddingsFormControls/StorefrontWeddingsFormControls.jsx';
import {StorefrontWeddingsCompletion} from '../app/organisms/StorefrontWeddingsCompletion/StorefrontWeddingsCompletion.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
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
            heroMedia={<StorefrontWeddingsHeroMedia placeholderLabel={v.t?.ph} />}
            services={<StorefrontWeddingsServices services={list(v.services)} />}
            story={
              <StorefrontWeddingsStory
                galleryTitle={v.t?.galleryTitle}
                gallery={list(v.gallery)}
                processTitle={v.t?.processTitle}
                process={list(v.process)}
              />
            }
            inquiryIntro={<StorefrontWeddingsInquiryIntro title={v.t?.fA} intro={v.t?.fP} />}
            inquiry={
              <>
                {v.notSent ? (
                  <>
                    <StorefrontWeddingsFormControls
                      problems={v.problems}
                      name={{
                        label: v.t?.name,
                        value: v.name,
                        onChange: v.setName,
                        error: v.nameErr
                      }}
                      email={{label: v.t?.emailLabel, value: v.email, onChange: v.setEmail}}
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
                        onChange: v.setNotes
                      }}
                      send={{label: v.t?.send, onClick: v.send, busy: v.busy}}
                    />
                  </>
                ) : null}
                {v.sent ? (
                  <>
                    <StorefrontWeddingsCompletion
                      title={v.t?.okT}
                      body={v.t?.okP}
                      edit={{label: v.t?.editMessage, onClick: v.editMessage}}
                    />
                  </>
                ) : null}
              </>
            }
            feedback={
              v.apiError ? (
                <>
                  <DS.Alert tone="danger" title={v.apiError} />
                </>
              ) : null
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
