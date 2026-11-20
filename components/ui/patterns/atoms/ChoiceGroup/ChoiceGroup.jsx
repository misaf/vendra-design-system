'use client';

import React from 'react';
import {I18nProvider, RadioGroup} from 'react-aria-components';
import {useField, FieldMessage} from '../../../components/Field/Field.jsx';
import {cx} from '../../utils/cx.js';
import {usePageLocale} from '../../utils/locale.js';
import {useMergedRef} from '../../utils/refs.js';

// A radiogroup of ChoiceTiles on React Aria: arrow keys move and select (mirrored in RTL, following
// the page's language), with one Tab stop. Controlled with `value`, or not with `defaultValue`;
// onChange(value) gets the chosen tile's value, and `name` is the form field it posts under. `legend` renders <fieldset><legend>; the hint or error
// sits under the tiles (see Field).
export function ChoiceGroup({
  label,
  labelledBy,
  legend,
  hint,
  error,
  id,
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  columns,
  minTileWidth = 140,
  children,
  className,
  style,

  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': describedBy,
  'aria-details': details,
  ref,
  ...rest
}) {
  const {fieldId, messageId, message, controlProps} = useField({id, hint, error, describedBy});
  const legendId = fieldId + '-legend';
  const {locale, ref: localeRef} = usePageLocale();
  const rootRef = useMergedRef(localeRef, ref);
  const wrapped = !!(legend || message);
  const group = (
    <I18nProvider locale={locale}>
      <RadioGroup
        {...(!wrapped && rest)}
        ref={wrapped ? undefined : rootRef}
        id={fieldId}
        name={name}
        value={value === undefined ? undefined : (value ?? null)}
        defaultValue={defaultValue}
        onChange={next => onChange && onChange(next)}
        isDisabled={disabled}
        aria-label={legend ? undefined : (label ?? ariaLabel)}
        aria-labelledby={cx(legend && legendId, labelledBy ?? ariaLabelledBy) || undefined}
        aria-details={details}
        aria-describedby={controlProps['aria-describedby']}
        aria-errormessage={controlProps['aria-errormessage']}
        isInvalid={!!error}
        className={cx('ag-choices', error && 'ag-choices--error', !wrapped && className)}
        style={{
          gridTemplateColumns: columns
            ? 'repeat(' + columns + ',minmax(0,1fr))'
            : 'repeat(auto-fill,minmax(' + minTileWidth + 'px,1fr))',
          ...(wrapped ? null : style)
        }}
      >
        {children}
      </RadioGroup>
    </I18nProvider>
  );
  if (!wrapped) return group;
  const hintElement = (
    <FieldMessage id={messageId} error={!!error}>
      {message}
    </FieldMessage>
  );
  if (legend)
    return (
      <fieldset
        {...rest}
        ref={rootRef}
        className={cx('ag-field ag-fieldset', className)}
        style={style}
      >
        <legend id={legendId} className="ag-field__label">
          {legend}
        </legend>
        {group}
        {hintElement}
      </fieldset>
    );
  return (
    <div {...rest} ref={rootRef} className={cx('ag-field', className)} style={style}>
      {group}
      {hintElement}
    </div>
  );
}
