import React from 'react';
import {cx} from '../utils/cx.js';

// One selectable tile (role="radio") inside a ChoiceGroup. The label alone names the tile; the
// description is read after it, so it never becomes part of the name.
export function ChoiceTile({
  label,
  description,
  selected,
  disabled,
  onSelect,
  size = 'md',
  className = '',
  ...rest
}) {
  const baseId = React.useId();
  const labelId = baseId + '-label';
  const descriptionId = baseId + '-desc';
  const namedByLabel = description && label && !rest['aria-label'] && !rest['aria-labelledby'];
  const describedBy = cx(description && descriptionId, rest['aria-describedby']) || undefined;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={!!selected}
      disabled={disabled}
      tabIndex={selected ? 0 : -1}
      className={cx(
        'ag-choice',
        'ag-choice--' + size,
        selected && 'ag-choice--selected',
        className
      )}
      onClick={() => onSelect && onSelect()}
      {...rest}
      aria-labelledby={namedByLabel ? labelId : rest['aria-labelledby']}
      aria-describedby={describedBy}
    >
      <span id={labelId} className="ag-choice__label">
        {label}
      </span>
      {description && (
        <span id={descriptionId} className="ag-choice__desc">
          {description}
        </span>
      )}
    </button>
  );
}
