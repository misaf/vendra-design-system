import React from 'react';

export function StorefrontPolicyContents({label, sections}) {
  return (
    <nav aria-label={label} className="vf-info-toc vf-sticky-panel tw:flex tw:flex-col tw:gap-1">
      <div className="vf-info-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
        <>{label}</>
      </div>
      {sections.map((s, $index) => (
        <React.Fragment key={$index}>
          <a
            href={s?.href}
            className="vf-policy-toc-link tw:min-h-tap tw:flex tw:items-center tw:text-sm tw:text-body! tw:no-underline! tw:hover:text-accent"
          >
            <>{s?.title}</>
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
}
