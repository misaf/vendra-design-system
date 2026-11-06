import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontHomeNewsletter({
  open,
  done,
  doneText,
  value,
  error,
  sending,
  labels,
  onChange,
  onSubmit
}) {
  return (
    <>
      <div className="tw:[flex:1_1_280px] tw:flex tw:flex-col tw:gap-2">
        <h2
          id="vf-news-title"
          className="tw:m-0 tw:font-display tw:font-medium tw:text-xl tw:tracking-display"
        >
          <>{labels.title}</>
        </h2>
        <p className="tw:m-0 tw:text-sm tw:text-secondary tw:max-w-measure">
          <>{labels.description}</>
        </p>
      </div>
      {/* The pending announcer may retain this reference after the form unmounts. */}
      <span id="vf-news-submit-label" className="ag-sr-only">
        {labels.submit}
      </span>
      {open ? (
        <form
          onSubmit={onSubmit}
          noValidate
          className="vf-home-newsletter-form tw:[flex:1_1_320px] tw:max-w-narrow tw:flex tw:flex-col tw:gap-2"
        >
          <label id="vf-news-email-label" htmlFor="vf-news-email" className="ag-field__label">
            <>{labels.email}</>
          </label>
          <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-3">
            <div className="tw:[flex:1_1_220px]">
              <DS.Input
                id="vf-news-email"
                aria-labelledby="vf-news-email-label"
                value={value}
                onChange={onChange}
                error={error}
                type="email"
                dir="ltr"
                autoComplete="email"
              />
            </div>
            <DS.Button
              type="submit"
              aria-labelledby="vf-news-submit-label"
              loading={sending}
              loadingLabel={labels.sending}
              className="tw:h-[48px]!"
            >
              <>{labels.submit}</>
            </DS.Button>
          </div>
        </form>
      ) : null}
      {done ? (
        <p
          id="vf-news-done"
          tabIndex={-1}
          role="status"
          className="tw:m-0 tw:text-sm tw:[flex:1_1_320px] tw:max-w-narrow"
        >
          <>{doneText}</>
        </p>
      ) : null}
    </>
  );
}
