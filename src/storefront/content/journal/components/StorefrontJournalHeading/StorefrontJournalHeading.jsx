import React from 'react';
import {Chip} from '../../../../../design-system/components/Chip/Chip.jsx';
import {SectionHeader} from '../../../../../design-system/components/SectionHeader/SectionHeader.jsx';

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
      <SectionHeader level="h1" eyebrow={eyebrow} title={title} accent={accent} />
      <div
        role="group"
        aria-label={categoriesLabel}
        className="vf-journal-categories tw:flex tw:gap-2 tw:flex-wrap"
        onFocus={onCategoryFocus}
      >
        {categories.map((c, $index) => (
          <React.Fragment key={$index}>
            <Chip selected={c?.on} aria-pressed={c?.on} onClick={c?.pick}>
              <>{c?.label}</>
            </Chip>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
