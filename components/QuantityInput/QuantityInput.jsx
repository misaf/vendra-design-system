import React from 'react';
import {Button, Group, I18nProvider, Input, NumberField} from 'react-aria-components';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';
import {usePageLocale} from '../utils/locale.js';
import {useMessages} from '../utils/messages.js';

// A −/+ quantity control on React Aria's NumberField, controlled (`value`) or not (`defaultValue`),
// clamped to min..max. The count is a text field (React Aria drops the spinbutton role, which
// VoiceOver can't focus): type a number, or use ↑/↓, Home/End or the buttons (which, as in React Aria, are left out of the Tab order). Digits follow the page's
// language.
export function QuantityInput({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  disabled,
  size = 'md',
  labels = {}
}) {
  const {locale, ref} = usePageLocale();
  const text = useMessages('QuantityInput', labels, locale);
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const quantity = value ?? uncontrolledValue;
  return (
    <I18nProvider locale={locale}>
      {/* NumberField keeps the text it first formatted, so a new locale (the page's lang, read
          before the first paint) gets a fresh field. */}
      <NumberField
        key={locale}
        ref={ref}
        value={quantity}
        minValue={min}
        maxValue={max}
        step={1}
        isDisabled={disabled}
        aria-label={text.value}
        onChange={next => {
          if (Number.isNaN(next)) return;
          if (value === undefined) setUncontrolledValue(next);
          onChange && onChange(next);
        }}
        className="ag-qty-root"
      >
        <Group
          className={cx('ag-qty', size === 'sm' && 'ag-qty--sm', disabled && 'ag-qty--disabled')}
        >
          <Button slot="decrement" aria-label={text.dec}>
            <Icon name="minus" size={16} />
          </Button>
          <Input className="ag-qty__val" />
          <Button slot="increment" aria-label={text.inc}>
            <Icon name="plus" size={16} />
          </Button>
        </Group>
      </NumberField>
    </I18nProvider>
  );
}
