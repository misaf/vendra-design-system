import React from 'react';
import {Radio} from 'react-aria-components';
import {cx} from '../utils/cx.js';

// One selectable tile (a React Aria radio) inside a ChoiceGroup, which holds the chosen value. The
// label alone names the tile; the description is read after it, so it never becomes part of the name.
export function ChoiceTile({
  label,
  description,
  value,
  disabled,
  size = 'md',
  className = '',
  ...rest
}) {
  const tileId = React.useId();
  const labelId = tileId + '-label';
  const descriptionId = tileId + '-desc';
  const namedByLabel = description && label && !rest['aria-label'] && !rest['aria-labelledby'];
  return (
    <Radio
      {...rest}
      value={String(value)}
      isDisabled={disabled}
      aria-labelledby={namedByLabel ? labelId : rest['aria-labelledby']}
      aria-describedby={cx(description && descriptionId, rest['aria-describedby']) || undefined}
      className={({isSelected}) =>
        cx('ag-choice', 'ag-choice--' + size, isSelected && 'ag-choice--selected', className)
      }
    >
      <span id={labelId} className="ag-choice__label">
        {label}
      </span>
      {description && (
        <span id={descriptionId} className="ag-choice__desc">
          {description}
        </span>
      )}
    </Radio>
  );
}
