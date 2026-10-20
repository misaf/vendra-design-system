import React from 'react';
import {Accordion} from '../../ds.js';

// Both CSS layouts use the same link data and navigation markup. Only the phone layout adds
// disclosures; wider screens retain their expanded columns and landmark labels.
function FooterNavigation({group, compact = false, consentSettingsLabel, onOpenConsent}) {
  const headingId = 'vf-footer-' + group.id;
  return (
    <nav
      aria-label={compact ? group.title : undefined}
      aria-labelledby={compact ? undefined : headingId}
      className="vf-shell-footer-nav tw:flex tw:flex-col tw:gap-3 tw:items-start tw:text-sm"
    >
      {!compact && (
        <div
          id={headingId}
          className="vf-shell-footer-label tw:text-xs tw:tracking-eyebrow tw:uppercase tw:text-inverse-quiet tw:mb-1"
        >
          {group.title}
        </div>
      )}
      {group.links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          aria-current={link.current}
          className="vf-shell-footer-link tw:text-on-inverse! tw:no-underline! tw:hover:underline! tw:[text-underline-offset:4px]"
        >
          {link.label}
        </a>
      ))}
      {group.id === 'help' && (
        <button
          type="button"
          id={compact ? 'vf-consent-settings-mobile' : 'vf-consent-settings'}
          onClick={onOpenConsent}
          className="vf-shell-footer-link tw:p-0 tw:[border:0] tw:bg-transparent tw:text-on-inverse tw:[font:inherit] tw:text-start tw:cursor-pointer tw:hover:underline! tw:[text-underline-offset:4px]"
        >
          {consentSettingsLabel}
        </button>
      )}
    </nav>
  );
}

export function FooterLinks({groups, consentSettingsLabel, onOpenConsent}) {
  return (
    <>
      <div className="vf-shell-footer-expanded">
        {groups.map(group => (
          <FooterNavigation
            key={group.id}
            consentSettingsLabel={consentSettingsLabel}
            onOpenConsent={onOpenConsent}
            group={group}
          />
        ))}
      </div>
      <div className="vf-shell-footer-compact">
        <Accordion
          headingLevel={2}
          allowMultiple
          items={groups.map(group => ({
            id: group.id,
            title: group.title,
            content: (
              <FooterNavigation
                consentSettingsLabel={consentSettingsLabel}
                onOpenConsent={onOpenConsent}
                group={group}
                compact
              />
            )
          }))}
        />
      </div>
    </>
  );
}
