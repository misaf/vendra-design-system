import React from 'react';
import {IconButton} from '@vendra/ui/IconButton';
import {Tooltip} from './Tooltip.jsx';

export function Fixture() {
  return (
    <div>
      <Tooltip content="Save to favourites">
        <IconButton icon="heart" label="Save" variant="secondary" />
      </Tooltip>{' '}
      <button type="button">After</button>
    </div>
  );
}
