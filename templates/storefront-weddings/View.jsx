// StorefrontWeddings: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontWeddingsLayout} from '../app/layouts/StorefrontWeddingsLayout/StorefrontWeddingsLayout.jsx';
import {StorefrontWeddingsHeading} from '../app/organisms/StorefrontWeddingsHeading/StorefrontWeddingsHeading.jsx';
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
            heroMedia={
              <>
                <DS.ArchFrame ratio="4/5" placeholderLabel={v.t?.ph} alt="" />
              </>
            }
            services={
              <>
                {list(v.services).map((s, $index) => (
                  <React.Fragment key={$index}>
                    <DS.Card padding={24}>
                      <div className="tw:flex tw:flex-col tw:gap-3">
                        <div className="vf-weddings-service-icon tw:grid tw:w-tap tw:h-tap tw:rounded-pill tw:bg-accent-soft tw:text-on-soft tw:place-items-center">
                          <DS.Icon name={s?.icon} size={20} />
                        </div>
                        <div className="vf-weddings-service-title tw:text-md tw:font-medium">
                          <>{s?.title}</>
                        </div>
                        <div className="vf-weddings-service-description tw:text-base tw:leading-body tw:text-quiet">
                          <>{s?.body}</>
                        </div>
                        <div className="vf-weddings-service-price tw:text-sm tw:font-medium tw:text-accent">
                          <>{s?.price}</>
                        </div>
                      </div>
                    </DS.Card>
                  </React.Fragment>
                ))}
              </>
            }
            story={
              <>
                <h2>
                  <>{v.t?.galleryTitle}</>
                </h2>
                <div className="tw:grid tw:grid-cols-3 tw:gap-4">
                  {list(v.gallery).map((photo, $index) => (
                    <React.Fragment key={$index}>
                      <img
                        src={photo?.src}
                        alt={photo?.alt}
                        loading="lazy"
                        className="tw:w-full tw:rounded-md"
                      />
                    </React.Fragment>
                  ))}
                </div>
                <h2 className="tw:mt-7">
                  <>{v.t?.processTitle}</>
                </h2>
                <ol className="tw:grid tw:gap-5 tw:md:grid-cols-3">
                  {list(v.process).map((step, $index) => (
                    <React.Fragment key={$index}>
                      <li>
                        <>{step}</>
                      </li>
                    </React.Fragment>
                  ))}
                </ol>
              </>
            }
            inquiryIntro={
              <>
                <h2 className="vf-weddings-inquiry-title tw:m-0 tw:font-display tw:font-medium tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]">
                  <>{v.t?.fA}</>
                </h2>
                <p className="vf-weddings-inquiry-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
                  <>{v.t?.fP}</>
                </p>
              </>
            }
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
