import React from 'react';
import {I18nProvider, RadioGroup as AriaRadioGroup} from 'react-aria-components';
import {useField, FieldMessage} from '../Field/Field.jsx';
import {cx} from '../../utils/cx.js';
import {usePageLocale} from '../../utils/locale.js';

// A list of Radios on React Aria's RadioGroup: one Tab stop, arrow keys move and select (mirrored
// in RTL, following the page's language). Controlled with `value`, or not with `defaultValue`;
// onChange(value) gets the chosen Radio's value, and `name` is the form field it posts under.
// `legend` renders <fieldset><legend>; the hint or error sits under the radios (see Field).
export function RadioGroup({
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
  required,
  children,
  className,
  style
}) {
  const {fieldId, messageId, message, controlProps} = useField({id, hint, error});
  const legendId = fieldId + '-legend';
  const {locale, ref} = usePageLocale();
  const wrapped = !!(legend || message);
  const group = (
    <I18nProvider locale={locale}>
      <AriaRadioGroup
        ref={wrapped ? undefined : ref}
        id={fieldId}
        name={name}
        value={value === undefined ? undefined : (value ?? null)}
        defaultValue={defaultValue}
        onChange={next => onChange && onChange(next)}
        isDisabled={disabled}
        isRequired={required}
        isInvalid={!!error}
        validationBehavior="aria"
        aria-label={legend ? undefined : label}
        aria-labelledby={legend ? legendId : labelledBy}
        aria-describedby={controlProps['aria-describedby']}
        aria-errormessage={controlProps['aria-errormessage']}
        className={cx('ag-radios', !wrapped && className)}
        style={wrapped ? undefined : style}
      >
        {children}
      </AriaRadioGroup>
    </I18nProvider>
  );
  if (!wrapped) return group;
  const messageElement = (
    <FieldMessage id={messageId} error={!!error}>
      {message}
    </FieldMessage>
  );
  if (legend)
    return (
      <fieldset ref={ref} className={cx('ag-field ag-fieldset', className)} style={style}>
        <legend id={legendId} className="ag-field__label">
          {legend}
        </legend>
        {group}
        {messageElement}
      </fieldset>
    );
  return (
    <div ref={ref} className={cx('ag-field', className)} style={style}>
      {group}
      {messageElement}
    </div>
  );
}
