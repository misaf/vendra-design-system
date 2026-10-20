import React from 'react';
import {IconButton, TrustSeal} from '../../ds.js';
import {FooterLinks} from './FooterLinks.jsx';

export function StorefrontFooter({
  homeHref,
  brand,
  tagline,
  socialLabel,
  socialLinks,
  visitLabel,
  address,
  directionsHref,
  directionsLabel,
  hours,
  phoneHref,
  phoneLabel,
  emailHref,
  email,
  seals,
  copyright,
  credit,
  groups,
  consentSettingsLabel,
  onOpenConsent
}) {
  return (
    <footer className="vf-shell-footer ag-on-inverse tw:bg-inverse tw:text-on-inverse tw:mt-9">
      <div className="vf-shell-footer-content tw:mx-auto tw:max-w-page tw:pt-8 tw:px-gutter tw:pb-6 tw:flex tw:flex-col tw:gap-7">
        <div className="vf-shell-footer-top tw:flex tw:flex-wrap tw:justify-between tw:gap-x-9 tw:gap-y-7">
          <div className="vf-shell-footer-brand-block tw:[flex:1_1_260px] tw:max-w-form tw:flex tw:flex-col tw:gap-4">
            <a
              href={homeHref}
              className="vf-shell-footer-brand tw:self-start tw:text-on-inverse! tw:no-underline! tw:font-display tw:font-medium tw:text-3xl tw:tracking-display tw:[text-transform:var(--display-case)]"
            >
              <>{brand}</>
            </a>
            <p className="tw:m-0 tw:text-sm tw:leading-body tw:text-inverse-quiet">
              <>{tagline}</>
            </p>
            <ul
              aria-label={socialLabel}
              className="vf-shell-footer-social tw:flex tw:gap-2 tw:list-none tw:m-0 tw:p-0"
            >
              {socialLinks.map((s, $index) => (
                <React.Fragment key={$index}>
                  <li>
                    <IconButton
                      icon={s?.icon}
                      label={s?.label}
                      href={s?.href}
                      target={s?.target}
                      variant="secondary"
                      inverse={true}
                    />
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
        <div className="vf-shell-footer-columns tw:grid tw:[grid-template-columns:repeat(auto-fit,minmax(140px,1fr))] tw:gap-x-5 tw:gap-y-7 tw:pt-7 tw:[border-top:1px_solid_var(--border-inverse)]">
          <FooterLinks
            groups={groups}
            consentSettingsLabel={consentSettingsLabel}
            onOpenConsent={onOpenConsent}
          />
          <div className="vf-shell-footer-details tw:flex tw:flex-col tw:gap-3 tw:items-start tw:text-sm">
            <div className="vf-shell-footer-label tw:text-xs tw:tracking-eyebrow tw:uppercase tw:text-inverse-quiet tw:mb-1">
              <>{visitLabel}</>
            </div>
            <address className="tw:not-italic tw:leading-body">
              <>{address}</>
            </address>
            {directionsHref ? (
              <>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vf-shell-footer-link tw:text-on-inverse! tw:[text-underline-offset:4px]"
                >
                  <>{directionsLabel}</>
                </a>
              </>
            ) : null}
            <div className="tw:text-inverse-quiet">
              <>{hours}</>
            </div>
            <a
              href={phoneHref}
              dir="ltr"
              className="vf-shell-footer-contact-link vf-shell-footer-link tw:text-on-inverse! tw:no-underline! tw:hover:underline! tw:[text-underline-offset:4px]"
            >
              <>{phoneLabel}</>
            </a>
            {email ? (
              <>
                <a
                  href={emailHref}
                  dir="ltr"
                  className="vf-shell-footer-link tw:text-on-inverse! tw:no-underline! tw:hover:underline! tw:[text-underline-offset:4px]"
                >
                  <>{email}</>
                </a>
              </>
            ) : null}
            {seals.length ? (
              <div className="vf-shell-footer-seals tw:flex tw:flex-wrap tw:gap-3 tw:mt-2">
                {seals.map((seal, $index) => (
                  <React.Fragment key={$index}>
                    <TrustSeal kind={seal?.kind} href={seal?.href} image={seal?.image} />
                  </React.Fragment>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="vf-shell-footer-bottom tw:flex tw:flex-wrap tw:justify-between tw:items-center tw:gap-x-6 tw:gap-y-2 tw:pt-5 tw:[border-top:1px_solid_var(--border-inverse)] tw:text-xs tw:text-inverse-quiet">
          <p className="tw:m-0">
            <>{copyright}</>
          </p>
          {credit ? (
            <>
              <p className="vf-shell-footer-credit tw:m-0">
                <>{credit?.before} </>
                <a
                  href={credit?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw:text-on-inverse! tw:[text-underline-offset:4px]"
                >
                  <>{credit?.name}</>
                </a>
              </p>
            </>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
