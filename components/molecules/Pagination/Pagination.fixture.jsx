import React from 'react';
import {Pagination} from './Pagination.jsx';

export function Fixture() {
  const [page, setPage] = React.useState(1);
  return (
    <div>
      <Pagination page={page} pageCount={9} onChange={setPage} />
      <Pagination page={4} pageCount={9} href={number => '?page=' + number} label="Linked pages" />
      <output data-test="page">{page}</output>
    </div>
  );
}
