import React from 'react';
import {Skeleton} from '../../../../../../../ui/components/Skeleton/Skeleton.jsx';

export function StorefrontPostLoading({title, message}) {
  return (
    <>
      <h1>
        <>{title}</>
      </h1>
      <Skeleton shape="card" />
      <p role="status">
        <>{message}</>
      </p>
    </>
  );
}
