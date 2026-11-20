import React from 'react';
import {Skeleton} from '../../../../../../ui/components/Skeleton/Skeleton.jsx';

export function StorefrontJournalLoading({message}) {
  return (
    <>
      <Skeleton shape="card" />
      <p role="status">
        <>{message}</>
      </p>
    </>
  );
}
