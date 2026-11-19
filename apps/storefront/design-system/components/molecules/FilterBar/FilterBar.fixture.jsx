import React from 'react';
import {FilterBar} from './FilterBar.jsx';

const FILTERS = [
  ['occasion', 'Anniversary'],
  ['price', 'Under 3M'],
  ['stock', 'In stock only']
];

export function Fixture() {
  const [filterIds, setFilterIds] = React.useState(FILTERS.map(([id]) => id));
  return (
    <div>
      <FilterBar
        filters={FILTERS.filter(([id]) => filterIds.includes(id)).map(([id, label]) => ({
          id,
          label,
          onRemove: () => setFilterIds(ids => ids.filter(other => other !== id))
        }))}
        onClearAll={() => setFilterIds([])}
      />
      <FilterBar filters={[{label: 'Roses', onRemove() {}}]} label="Flowers" />
    </div>
  );
}
