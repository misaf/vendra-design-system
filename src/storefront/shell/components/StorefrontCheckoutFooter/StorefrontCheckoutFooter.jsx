import {StorefrontLink} from '../../ui/StorefrontLink.jsx';
import React from 'react';
import {TrustSeal} from '../../../../design-system/components/TrustSeal/TrustSeal.jsx';

export function StorefrontCheckoutFooter({links, seals, consentSettingsLabel, onOpenConsent}) {
  return (
    <footer className="vf-shell-footer tw:mt-7 tw:[border-top:1px_solid_var(--border-subtle)]">
      <div className="tw:mx-auto tw:max-w-page tw:px-gutter tw:py-4 tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-x-5 tw:gap-y-3">
        <ul className="tw:m-0 tw:p-0 tw:list-none tw:flex tw:flex-wrap tw:gap-x-4">
          {links.map(link => (
            <li key={link.href}>
              <StorefrontLink
                href={link.href}
                className="vf-shell-footer-link tw:inline-flex tw:items-center tw:min-h-tap tw:text-sm"
              >
                {link.label}
              </StorefrontLink>
            </li>
          ))}
          {onOpenConsent && (
            <li>
              <button
                type="button"
                id="vf-consent-settings"
                onClick={onOpenConsent}
                className="tw:min-h-tap tw:text-sm tw:text-body tw:underline tw:cursor-pointer tw:bg-transparent tw:[border:0] tw:p-0 tw:[font-family:inherit]"
              >
                {consentSettingsLabel}
              </button>
            </li>
          )}
        </ul>
        {seals.length > 0 && (
          <div className="tw:flex tw:flex-wrap tw:gap-3">
            {seals.map(seal => (
              <TrustSeal key={seal.kind} kind={seal.kind} href={seal.href} image={seal.image} />
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
