import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontSearchControls({query, close}) {
  return (
    <div className="vf-search-controls tw:flex tw:gap-3 tw:items-end">
      <div className="vf-search-input tw:min-w-0 tw:flex-1">
        <DS.SearchField
          id="vf-q"
          label={query.label}
          placeholder={query.placeholder}
          value={query.value}
          onChange={query.onChange}
        />
      </div>
      <DS.IconButton
        icon="x"
        label={close.label}
        variant="secondary"
        className="tw:flex-none"
        href={close.href}
      />
    </div>
  );
}
