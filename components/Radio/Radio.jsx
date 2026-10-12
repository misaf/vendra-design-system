import React from 'react';
import {Radio as AriaRadio, RadioGroup, RadioGroupStateContext} from 'react-aria-components';
import {cx} from '../utils/cx.js';

// One radio (React Aria) inside a RadioGroup, which holds the value and the keyboard. The label
// alone names the radio; the description is read after it, so it never becomes part of the name.
export function Radio({label, description, value, disabled, className, style, ...rest}) {
  const radioId = React.useId();
  const labelId = radioId + '-label';
  const descriptionId = radioId + '-desc';
  const namedByLabel = description && label && !rest['aria-label'] && !rest['aria-labelledby'];
  const group = React.useContext(RadioGroupStateContext);
  const radio = (
    <AriaRadio
      {...rest}
      value={String(value ?? radioId)}
      isDisabled={disabled}
      aria-labelledby={namedByLabel ? labelId : rest['aria-labelledby']}
      aria-describedby={cx(description && descriptionId, rest['aria-describedby']) || undefined}
      className={({isDisabled}) =>
        cx('ag-check ag-check--radio', isDisabled && 'ag-check--disabled', className)
      }
      style={style}
    >
      <span className="ag-check__box"></span>
      <span className="ag-check__text">
        <span id={labelId}>{label}</span>
        {description && (
          <span id={descriptionId} className="ag-check__desc">
            {description}
          </span>
        )}
      </span>
    </AriaRadio>
  );
  if (group) return radio;
  // A React Aria radio needs its group: one outside RadioGroup gets one of its own (and no arrow
  // keys to its neighbours), so wrap related radios in RadioGroup.
  return <RadioGroup aria-labelledby={labelId}>{radio}</RadioGroup>;
}
