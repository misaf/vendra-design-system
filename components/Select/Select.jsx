import React from 'react';
import {
  Button,
  I18nProvider,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue
} from 'react-aria-components';
import {Icon} from '../Icon/Icon.jsx';
import {useField, FieldMessage} from '../Field/Field.jsx';
import {cx} from '../utils/cx.js';
import {usePageLocale} from '../utils/locale.js';

// A labelled pop-up list on React Aria's Select, styled like Input. Options are strings or
// {value, label, disabled}. It takes `value` (or `defaultValue`), `onChange(event)` with the chosen
// value on event.target.value, and `name`/`required`/`autoComplete` for forms (React Aria keeps a
// hidden native select for autofill). A group picker (DatePicker) can own the message: it passes
// aria-invalid and aria-describedby itself, with no hint or error here.
export function Select({
  label,
  hint,
  error,
  options = [],
  placeholder = '',
  disabled,
  required,
  id,
  name,
  value,
  defaultValue,
  onChange,
  className,
  style,
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  'aria-errormessage': _errorMessage,
  ...rest
}) {
  const {fieldId, messageId, message, controlProps} = useField({id, hint, error, describedBy});
  const {locale, ref} = usePageLocale();
  const invalid = !!error || ariaInvalid === true || ariaInvalid === 'true';
  const toKey = selected => (selected == null || selected === '' ? null : String(selected));
  const items = options.map(option =>
    typeof option === 'string' ? {value: option, label: option} : option
  );
  return (
    <I18nProvider locale={locale}>
      <AriaSelect
        {...rest}
        ref={ref}
        id={fieldId}
        name={name}
        selectedKey={value === undefined ? undefined : toKey(value)}
        defaultSelectedKey={toKey(defaultValue)}
        onSelectionChange={key => {
          const target = {value: key == null ? '' : String(key), name, id: fieldId};
          onChange && onChange({target, currentTarget: target, type: 'change'});
        }}
        placeholder={placeholder}
        isDisabled={disabled}
        isRequired={required}
        isInvalid={invalid}
        validationBehavior="aria"
        aria-describedby={controlProps['aria-describedby']}
        className={cx('ag-field ag-select', className)}
        style={style}
      >
        {label && <Label className="ag-field__label">{label}</Label>}
        <Button
          className={cx(
            'ag-input ag-select__trigger',
            invalid && 'ag-input--error',
            disabled && 'ag-input--disabled'
          )}
        >
          <SelectValue className="ag-select__value" />
          <Icon name="chevron-down" size={16} className="ag-input__chev" />
        </Button>
        <FieldMessage id={messageId} error={!!error}>
          {message}
        </FieldMessage>
        <Popover className="ag-select__popover" offset={4}>
          <ListBox className="ag-select__list" items={items}>
            {item => (
              <ListBoxItem
                id={String(item.value)}
                textValue={String(item.label)}
                isDisabled={!!item.disabled}
                className="ag-select__option"
              >
                {item.label}
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
      </AriaSelect>
    </I18nProvider>
  );
}
