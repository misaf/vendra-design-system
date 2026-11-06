import React from 'react';
import {IconButton} from '../../ds.js';

export function StorefrontConsent({
  shown,
  title,
  closeLabel,
  onClose,
  body,
  policyHref,
  policyLabel,
  onAccept,
  acceptLabel,
  onEssential,
  essentialLabel
}) {
  if (!shown) return null;
  return (
    <div className="vf-shell-consent-dock vf-shell-consent-bar tw:max-md:px-3 tw:max-md:pb-3">
      <section
        id="vf-consent"
        tabIndex={-1}
        aria-labelledby="vf-consent-title"
        className="vf-shell-consent ag-on-inverse tw:flex tw:flex-col tw:gap-2 tw:p-4 tw:rounded-md tw:bg-inverse tw:text-on-inverse tw:shadow-lg tw:text-sm tw:leading-body"
      >
        <div className="tw:flex tw:items-center tw:justify-between tw:gap-3">
          <h2
            id="vf-consent-title"
            className="tw:m-0 tw:font-display tw:font-medium tw:text-md tw:tracking-display"
          >
            <>{title}</>
          </h2>
          <IconButton
            icon="x"
            label={closeLabel}
            onClick={onClose}
            variant="secondary"
            inverse={true}
            className="vf-shell-consent-close tw:-me-2"
          />
        </div>
        <p className="tw:m-0">
          <>{body} </>
          <a
            href={policyHref}
            className="vf-shell-consent-link tw:text-on-inverse! tw:[text-underline-offset:4px]"
          >
            <>{policyLabel}</>
          </a>
        </p>
        <div className="tw:flex tw:flex-wrap tw:gap-2">
          <button
            type="button"
            onClick={onAccept}
            className="vf-shell-consent-accept tw:flex-1 tw:whitespace-nowrap tw:min-h-tap tw:px-4 tw:rounded-full tw:[border:1px_solid_var(--text-on-inverse)] tw:[font:inherit] tw:font-medium tw:cursor-pointer tw:bg-on-inverse tw:text-body tw:hover:bg-sunken"
          >
            <>{acceptLabel}</>
          </button>
          <button
            type="button"
            onClick={onEssential}
            className="vf-shell-consent-essential tw:flex-1 tw:whitespace-nowrap tw:min-h-tap tw:px-4 tw:rounded-full tw:[border:1px_solid_var(--text-on-inverse)] tw:[font:inherit] tw:font-medium tw:cursor-pointer tw:bg-transparent tw:text-on-inverse tw:hover:bg-[color-mix(in_srgb,var(--text-on-inverse)_12%,transparent)]"
          >
            <>{essentialLabel}</>
          </button>
        </div>
      </section>
    </div>
  );
}
