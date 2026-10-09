import React from 'react';
import {Radio, RadioGroup} from 'react-aria-components';
import {choiceGroupContext} from './ChoiceGroup.jsx';
import {cx} from '../utils/cx.js';

// One selectable tile (a React Aria radio) inside a ChoiceGroup. The label alone names the tile; the
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
  const value = React.useId();
  const labelId = value + '-label';
  const descriptionId = value + '-desc';
  const group = React.useContext(choiceGroupContext);
  // Tell the group whether this tile is the selected one and what selecting it does.
  const latest = React.useRef(onSelect);
  latest.current = onSelect;
  React.useLayoutEffect(() => {
    if (!group) return;
    group.report(value, {selected: !!selected, onSelect: () => latest.current && latest.current()});
  }, [group, selected]);
  React.useLayoutEffect(() => () => group && group.report(value, null), [group]);
  const namedByLabel = description && label && !rest['aria-label'] && !rest['aria-labelledby'];
  const tile = (
    <Radio
      {...rest}
      value={value}
      isDisabled={disabled}
      aria-labelledby={namedByLabel ? labelId : rest['aria-labelledby']}
      aria-describedby={cx(description && descriptionId, rest['aria-describedby']) || undefined}
      className={cx(
        'ag-choice',
        'ag-choice--' + size,
        selected && 'ag-choice--selected',
        className
      )}
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
  // A React Aria radio needs its group: a tile outside ChoiceGroup gets one of its own.
  if (group) return tile;
  return (
    <RadioGroup
      aria-labelledby={labelId}
      value={selected ? value : null}
      onChange={() => onSelect && onSelect()}
    >
      {tile}
    </RadioGroup>
  );
}
