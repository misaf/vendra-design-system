import React from 'react';
import {IconButton} from '../../../../../../ui/components/IconButton/IconButton.jsx';
import {SearchField} from '../../../../../../ui/components/SearchField/SearchField.jsx';

export function StorefrontSearchControls({query, close}) {
  return (
    <div className="vf-search-controls tw:flex tw:gap-3 tw:items-end">
      <div className="vf-search-input tw:min-w-0 tw:flex-1">
        <SearchField
          id="vf-q"
          label={query.label}
          placeholder={query.placeholder}
          value={query.value}
          onChange={query.onChange}
        />
      </div>
      <IconButton
        icon="x"
        label={close.label}
        variant="secondary"
        className="tw:flex-none"
        href={close.href}
      />
    </div>
  );
}
