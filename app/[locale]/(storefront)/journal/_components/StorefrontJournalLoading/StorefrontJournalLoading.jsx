import React from 'react';
import {Skeleton} from '../../../../../../components/ui/patterns/atoms/Skeleton/Skeleton.jsx';

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
