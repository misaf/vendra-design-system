import React from 'react';
import * as DS from './ds.js';
import {list} from './runtime.js';

// Both CSS layouts use the same link data and navigation markup. Only the phone layout adds
// disclosures; wider screens retain their expanded columns and landmark labels.
function FooterNavigation({v, group, compact = false}) {
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
          onClick={v.consent?.open}
          className="vf-shell-footer-link tw:p-0 tw:[border:0] tw:bg-transparent tw:text-on-inverse tw:[font:inherit] tw:text-start tw:cursor-pointer tw:hover:underline! tw:[text-underline-offset:4px]"
        >
          {v.shellText?.consent?.settings}
        </button>
      )}
    </nav>
  );
}

export function FooterLinks({v}) {
  const groups = [
    {id: 'shop', title: v.shellText?.footer?.shop, links: list(v.footer?.shop)},
    {id: 'studio', title: v.shellText?.footer?.studio, links: list(v.footer?.studio)},
    {
      id: 'help',
      title: v.shellText?.help,
      links: [
        {href: v.href?.faq, label: v.shellText?.faq, current: v.footer?.faqCurrent},
        ...list(v.policyLinks)
      ]
    }
  ];
  return (
    <>
      <div className="vf-shell-footer-expanded">
        {groups.map(group => (
          <FooterNavigation key={group.id} v={v} group={group} />
        ))}
      </div>
      <div className="vf-shell-footer-compact">
        <DS.Accordion
          headingLevel={2}
          allowMultiple
          items={groups.map(group => ({
            id: group.id,
            title: group.title,
            content: <FooterNavigation v={v} group={group} compact />
          }))}
        />
      </div>
    </>
  );
}
