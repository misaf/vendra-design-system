import React from 'react';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  I18nProvider,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  useLocale
} from 'react-aria-components';
import {GregorianCalendar, PersianCalendar, parseDate, toCalendar} from '@internationalized/date';
import {Icon} from '../Icon/Icon.jsx';
import {dates} from '../utils/dates.js';
import {Select} from '../Select/Select.jsx';
import {FieldMessage} from '../Field/Field.jsx';
import {cx} from '../utils/cx.js';
import {localeLanguage, useMessages} from '../utils/messages.js';
import {useDensity} from '../utils/density.js';
import {messages} from './messages.js';

const GREGORIAN = new GregorianCalendar();
const PERSIAN = new PersianCalendar();
// ISO ↔ React Aria's CalendarDate (a value in any calendar comes back as an ISO Gregorian date).
const toDateValue = iso => {
  try {
    return iso ? parseDate(iso) : null;
  } catch (error) {
    return null;
  }
};
// React Aria lines the month grid up with minValue/maxValue, so they must be in the shown calendar.
const toBound = (iso, cal) => {
  const dateValue = toDateValue(iso);
  return dateValue ? toCalendar(dateValue, cal === 'j' ? PERSIAN : GREGORIAN) : undefined;
};
const toIso = dateValue => (dateValue ? toCalendar(dateValue, GREGORIAN).toString() : '');
// Longest Gregorian months, for a yearly date that has no year to check against.
const GREGORIAN_MAX_DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// A date in Jalali (Shamsi, 'j') or Gregorian ('g'), with a calendar toggle. `value` is an ISO date
// ("2026-10-08"): React Aria's DatePicker, a typed field (day, month and year segments) with a
// month grid in a pop-up, both in the chosen calendar. With `yearly` it is a recurring {cal, m, d}
// with no year, picked from month and day Selects. Under it, the same date in the other calendar.
export function DatePicker({
  label,
  value,
  onChange,
  calendar,
  onCalendarChange,
  calendars = ['j', 'g'],
  yearly = false,
  years = 3,
  minDate,
  hint,
  error,
  lang: langProp,
  labels,
  showEquivalent = true,
  disabled,
  id,
  className = '',
  style
}) {
  // Its own language (labels, digits, the preferred calendar), else the app's (VendraProvider).
  const lang = langProp || (localeLanguage(useLocale().locale) === 'fa' ? 'fa' : 'en');
  const text = useMessages('DatePicker', messages, labels, lang);
  const density = useDensity();
  const generatedId = React.useId();
  const fieldId = id || 'dp' + generatedId.replace(/:/g, '');
  const messageId = fieldId + '-hint';
  const labelId = fieldId + '-label';
  const message = error || hint;
  const preferredCalendar = lang === 'fa' ? 'j' : 'g';
  const [uncontrolledCalendar, setUncontrolledCalendar] = React.useState(
    () =>
      (yearly && value && value.cal) ||
      (calendars.includes(preferredCalendar) ? preferredCalendar : calendars[0])
  );
  React.useEffect(() => {
    if (yearly && !calendar && value && value.cal && value.cal !== uncontrolledCalendar)
      setUncontrolledCalendar(value.cal);
  }, [yearly && value && value.cal]);
  const activeCalendar = calendar || uncontrolledCalendar;
  const today = new Date();

  // The current value as {year, month, day} in calendar `cal` (no year when yearly).
  const partsFromValue = cal => {
    if (!value) return null;
    if (yearly) {
      if (!value.m || !value.d) return null;
      const valueCalendar = value.cal || 'j';
      if (valueCalendar === cal) return {month: value.m, day: value.d};
      const thisYear = dates.yearOf(valueCalendar, today);
      const lastDay = dates.daysInMonth(valueCalendar, thisYear, value.m);
      const date = dates.toDate(valueCalendar, thisYear, value.m, Math.min(value.d, lastDay));
      const [, month, day] = dates.parts(cal, date);
      return {month, day};
    }
    const date = dates.fromIso(value);
    if (!date) return null;
    const [year, month, day] = dates.parts(cal, date);
    return {year, month, day};
  };
  const valueKey = yearly
    ? value
      ? (value.cal || 'j') + value.m + '-' + value.d
      : ''
    : value || '';
  const [draft, setDraft] = React.useState(() => partsFromValue(activeCalendar) || {});
  React.useEffect(() => {
    setDraft(partsFromValue(activeCalendar) || {});
  }, [valueKey, activeCalendar]);

  const daysIn = ({year, month}) => {
    if (!month) return 31;
    if (!yearly && year) return dates.daysInMonth(activeCalendar, year, month);
    if (activeCalendar === 'j') return month <= 6 ? 31 : 30;
    return GREGORIAN_MAX_DAYS[month - 1];
  };
  const emit = next => {
    if (!onChange) return;
    if (yearly) {
      if (next.month && next.day) onChange({cal: activeCalendar, m: next.month, d: next.day});
    } else if (next.year && next.month && next.day) {
      onChange(dates.iso(dates.toDate(activeCalendar, next.year, next.month, next.day)));
    }
  };
  // Changing year or month clamps the day (Mehr 30 → Esfand 1404 = 29). Never rolls over into the next month.
  const onPartChange = part => selected => {
    const next = {...draft, [part]: selected ? +selected : undefined};
    if (next.day && next.month) next.day = Math.min(next.day, daysIn(next));
    setDraft(next);
    emit(next);
  };
  const switchCalendar = cal => {
    if (cal === activeCalendar) return;
    if (!calendar) setUncontrolledCalendar(cal);
    onCalendarChange && onCalendarChange(cal);
    if (yearly && draft.month && draft.day && onChange) {
      const thisYear = dates.yearOf(activeCalendar, today);
      const lastDay = dates.daysInMonth(activeCalendar, thisYear, draft.month);
      const date = dates.toDate(
        activeCalendar,
        thisYear,
        draft.month,
        Math.min(draft.day, lastDay)
      );
      const [, month, day] = dates.parts(cal, date);
      onChange({cal, m: month, d: day});
    }
  };

  const earliest = minDate ? dates.fromIso(minDate) : null;
  const firstYear = dates.yearOf(activeCalendar, earliest && earliest > today ? earliest : today);
  let yearOptions = Array.from({length: years}, (_, i) => firstYear + i);
  if (draft.year && !yearOptions.includes(draft.year))
    yearOptions = [...yearOptions, draft.year].sort((a, b) => a - b);
  // The last day offered: the end of the last of `years` years in the active calendar.
  const lastYear = yearOptions[yearOptions.length - 1];
  const lastIso = dates.iso(
    dates.toDate(activeCalendar, lastYear, 12, dates.daysInMonth(activeCalendar, lastYear, 12))
  );
  const monthNames = dates.monthNames(activeCalendar, lang);
  const localDigits = n => dates.digits(n, lang);
  const monthBeforeMin = month =>
    !!(
      earliest &&
      draft.year &&
      dates.toDate(
        activeCalendar,
        draft.year,
        month,
        dates.daysInMonth(activeCalendar, draft.year, month)
      ) < earliest
    );
  const dayBeforeMin = day =>
    !!(
      earliest &&
      draft.year &&
      draft.month &&
      dates.toDate(activeCalendar, draft.year, draft.month, day) < earliest
    );
  const complete = yearly ? draft.month && draft.day : draft.year && draft.month && draft.day;
  const otherCalendar = calendars.find(cal => cal !== activeCalendar);
  let equivalent = '';
  if (showEquivalent && otherCalendar && complete) {
    const date = yearly
      ? dates.nextYearly({cal: activeCalendar, m: draft.month, d: draft.day}).date
      : dates.toDate(activeCalendar, draft.year, draft.month, draft.day);
    equivalent = text.equivalent.replace(
      '{date}',
      dates.fullDate(date, dates.locale(lang, otherCalendar), false)
    );
  }
  const describedBy = message ? messageId : undefined;

  return (
    <fieldset className={cx('ag-fieldset', 'ag-date', className)} style={style} disabled={disabled}>
      <legend className="ag-date__legend">
        {label && (
          <span id={labelId} className="ag-field__label">
            {label}
          </span>
        )}
        {calendars.length > 1 && (
          <ToggleButtonGroup
            aria-label={text.calendar}
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[activeCalendar]}
            onSelectionChange={keys => keys.size && switchCalendar([...keys][0])}
            className="ag-date__cal"
          >
            {calendars.map(cal => (
              <ToggleButton key={cal} id={cal} className="ag-date__cal-option">
                {cal === 'j' ? text.jalali : text.gregorian}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      </legend>
      {yearly ? (
        <div className="ag-date__grid ag-date__grid--yearly">
          <Select
            id={fieldId + '-m'}
            label={text.month}
            value={draft.month ? String(draft.month) : ''}
            placeholder={draft.month ? undefined : '—'}
            onChange={onPartChange('month')}
            aria-describedby={describedBy}
            options={monthNames.map((name, i) => ({
              value: String(i + 1),
              label: name,
              disabled: monthBeforeMin(i + 1)
            }))}
          />
          <Select
            id={fieldId + '-d'}
            label={text.day}
            value={draft.day ? String(draft.day) : ''}
            placeholder={draft.day ? undefined : '—'}
            onChange={onPartChange('day')}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            aria-errormessage={error ? messageId : undefined}
            options={Array.from({length: daysIn(draft)}, (_, i) => ({
              value: String(i + 1),
              label: localDigits(i + 1),
              disabled: dayBeforeMin(i + 1)
            }))}
          />
        </div>
      ) : (
        <I18nProvider locale={dates.locale(lang, activeCalendar)}>
          <AriaDatePicker
            value={toDateValue(value)}
            onChange={dateValue => dateValue && onChange && onChange(toIso(dateValue))}
            minValue={earliest ? toBound(dates.iso(earliest), activeCalendar) : undefined}
            maxValue={toBound(lastIso, activeCalendar)}
            isDisabled={disabled}
            isInvalid={!!error}
            validationBehavior="aria"
            aria-labelledby={label ? labelId : undefined}
            aria-label={label ? undefined : text.open}
            aria-describedby={describedBy}
            className="ag-date__picker"
          >
            <Group className={cx('ag-input ag-date__field', error && 'ag-input--error')}>
              <DateInput id={fieldId} className="ag-date__input">
                {segment => <DateSegment segment={segment} className="ag-date__segment" />}
              </DateInput>
              <Button className="ag-date__open" aria-label={text.open}>
                <Icon name="calendar" size={18} />
              </Button>
            </Group>
            <Popover
              className="ag-date__popover"
              placement="bottom end"
              offset={4}
              data-density={density}
            >
              <Dialog className="ag-date__dialog" aria-label={label || text.open}>
                <Calendar className="ag-cal">
                  <header className="ag-cal__head">
                    <Button slot="previous" className="ag-cal__nav" aria-label={text.previous}>
                      <Icon name="chevron-left" size={18} />
                    </Button>
                    <Heading className="ag-cal__title" />
                    <Button slot="next" className="ag-cal__nav" aria-label={text.next}>
                      <Icon name="chevron-right" size={18} />
                    </Button>
                  </header>
                  <CalendarGrid className="ag-cal__grid">
                    {date => <CalendarCell date={date} className="ag-cal__cell" />}
                  </CalendarGrid>
                </Calendar>
              </Dialog>
            </Popover>
          </AriaDatePicker>
        </I18nProvider>
      )}
      <FieldMessage id={messageId} error={!!error}>
        {message}
      </FieldMessage>
      {showEquivalent && otherCalendar && (
        <p className="ag-date__eq" aria-live="polite">
          {equivalent}
        </p>
      )}
    </fieldset>
  );
}
