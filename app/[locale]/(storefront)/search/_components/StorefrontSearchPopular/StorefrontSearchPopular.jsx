import React from 'react';
import {Chip} from '../../../../../../components/ui/patterns/atoms/Chip/Chip.jsx';

export function StorefrontSearchPopular({title, terms}) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <div className="vf-search-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
        <>{title}</>
      </div>
      <div className="tw:flex tw:gap-2 tw:flex-wrap">
        {terms.map((term, index) => (
          <React.Fragment key={index}>
            <Chip onClick={term?.pick}>
              <>{term?.label}</>
            </Chip>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
