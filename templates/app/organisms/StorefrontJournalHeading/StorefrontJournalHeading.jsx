import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontJournalHeading({
  eyebrow,
  title,
  accent,
  categoriesLabel,
  categories,
  onCategoryFocus
}) {
  return (
    <>
      <DS.SectionHeader level="h1" eyebrow={eyebrow} title={title} accent={accent} />
      <div
        role="group"
        aria-label={categoriesLabel}
        className="vf-journal-categories tw:flex tw:gap-2 tw:flex-wrap"
        onFocus={onCategoryFocus}
      >
        {categories.map((c, $index) => (
          <React.Fragment key={$index}>
            <DS.Chip selected={c?.on} aria-pressed={c?.on} onClick={c?.pick}>
              <>{c?.label}</>
            </DS.Chip>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
