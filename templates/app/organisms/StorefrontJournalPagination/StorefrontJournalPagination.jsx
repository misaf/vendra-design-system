import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontJournalPagination({page, pageCount, href, onChange}) {
  return (
    <DS.Pagination
      className="vf-journal-pagination tw:mt-8"
      page={page}
      pageCount={pageCount}
      href={href}
      onChange={onChange}
    />
  );
}
