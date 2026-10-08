import React from 'react';
import {useField, FieldMessage} from '../Field/Field.jsx';
import {cx} from '../utils/cx.js';

// A native radio inside its <label>. The label alone names the radio; the description is read
// after it (aria-describedby), so it never becomes part of the name.
export function Radio({
  label,
  description,
  hint,
  error,
  disabled,
  id,
  className,
  style,
  'aria-describedby': describedBy,
  ...rest
}) {
  const {fieldId, messageId, message, controlProps} = useField({id, hint, error});
  const labelId = fieldId + '-label';
  const descriptionId = fieldId + '-desc';
  const namedByLabel = description && label && !rest['aria-label'] && !rest['aria-labelledby'];
  const box = (
    <label
      className={cx(
        'ag-check ag-check--radio',
        error && 'ag-check--error',
        disabled && 'ag-check--disabled',
        !message && className
      )}
      style={message ? undefined : style}
    >
      <input
        type="radio"
        id={id}
        disabled={disabled}
        {...rest}
        {...controlProps}
        aria-labelledby={namedByLabel ? labelId : rest['aria-labelledby']}
        aria-describedby={
          cx(description && descriptionId, message && messageId, describedBy) || undefined
        }
      />
      <span className="ag-check__box"></span>
      <span className="ag-check__text">
        <span id={labelId}>{label}</span>
        {description && (
          <span id={descriptionId} className="ag-check__desc">
            {description}
          </span>
        )}
      </span>
    </label>
  );
  if (!message) return box;
  return (
    <div className={cx('ag-field ag-field--check', className)} style={style}>
      {box}
      <FieldMessage id={messageId} error={!!error}>
        {message}
      </FieldMessage>
    </div>
  );
}
