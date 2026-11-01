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
                    <DS.Card padding={24}>
                      <div className="tw:flex tw:flex-col tw:gap-4">
                        <DS.ErrorSummary id="vf-wedding-errors" errors={v.problems} />
                        <div className="vf-weddings-fields tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
                          <DS.Input
                            id="vf-wname"
                            required={true}
                            label={v.t?.name}
                            autoComplete="name"
                            value={v.name}
                            onChange={v.setName}
                            error={v.nameErr}
                          />
                          <DS.Input
                            label={v.t?.emailLabel}
                            value={v.email}
                            onChange={v.setEmail}
                            type="email"
                            dir="ltr"
                            autoComplete="email"
                          />
                          <DS.PhoneInput
                            id="vf-wphone"
                            required={true}
                            label={v.t?.phone}
                            value={v.phone}
                            onChange={v.setPhone}
                            error={v.phoneErr}
                          />
                        </div>
                        <div className="vf-weddings-fields tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
                          <DS.Select
                            id="vf-wtype"
                            value={v.type}
                            onChange={v.setType}
                            label={v.t?.type}
                            options={v.types}
                          />
                        </div>
                        <DS.Input
                          label={v.t?.guests}
                          inputMode="numeric"
                          value={v.guests}
                          onChange={v.setGuests}
                        />
                        <DS.DatePicker
                          label={v.t?.date}
                          value={v.wDate}
                          onChange={v.setWDate}
                          lang={v.lang}
                          minDate={v.today}
                        />
                        <DS.Select
                          id="vf-wbudget"
                          value={v.budget}
                          onChange={v.setBudget}
                          label={v.t?.budget}
                          options={v.budgets}
                        />
                        <DS.Input
                          id="vf-wmsg"
                          value={v.notes}
                          onChange={v.setNotes}
                          label={v.t?.msg}
                          hint={v.t?.msgHint}
                          multiline={true}
                          rows={4}
                        />
                        <div>
                          <DS.Button
                            variant="primary"
                            size="lg"
                            iconEnd="send"
                            onClick={v.send}
                            loading={v.busy}
                            disabled={v.busy}
                          >
                            <>{v.t?.send}</>
                          </DS.Button>
                        </div>
                      </div>
                    </DS.Card>
                  </>
                ) : null}
                {v.sent ? (
                  <>
                    <div
                      id="vf-weddings-success"
                      tabIndex={-1}
                      role="region"
                      aria-label={v.t?.okT}
                      className="tw:flex tw:flex-col tw:gap-4"
                    >
                      <DS.Alert tone="success" title={v.t?.okT}>
                        <>{v.t?.okP}</>
                      </DS.Alert>
                      <div>
                        <DS.Button variant="secondary" onClick={v.editMessage}>
                          <>{v.t?.editMessage}</>
                        </DS.Button>
                      </div>
                    </div>
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
