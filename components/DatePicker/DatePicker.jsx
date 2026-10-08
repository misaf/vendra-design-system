import React from 'react';
import {dates} from '../utils/dates.js';
import {Select} from '../Select/Select.jsx';
import {Tabs} from '../Tabs/Tabs.jsx';
import {FieldMessage} from '../Field/Field.jsx';
import {cx} from '../utils/cx.js';

const DEFAULT_LABELS = {
  en: {
    jalali: 'Shamsi',
    gregorian: 'Gregorian',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    equivalent: 'That’s {date}'
  },
  fa: {
    jalali: 'شمسی',
    gregorian: 'میلادی',
    year: 'سال',
    month: 'ماه',
    day: 'روز',
    equivalent: 'برابر با {date}'
  }
};
// Longest Gregorian months, for a yearly date that has no year to check against.
const GREGORIAN_MAX_DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Year / month / day selects in Jalali (Shamsi, 'j') or Gregorian ('g'), with a calendar toggle.
// `value` is an ISO date ("2026-10-08"), or with `yearly` a recurring {cal, m, d} with no year.
// Under the selects it shows the same date in the other calendar.
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
  lang = 'en',
  labels,
  showEquivalent = true,
  disabled,
  id,
  className = '',
  style
}) {
  const text = {...DEFAULT_LABELS[lang === 'fa' ? 'fa' : 'en'], ...labels};
  const generatedId = React.useId();
  const fieldId = id || 'dp' + generatedId.replace(/:/g, '');
  const messageId = fieldId + '-hint';
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
  const onPartChange = part => event => {
    const selected = event.target.value;
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
        {label && <span className="ag-field__label">{label}</span>}
        {calendars.length > 1 && (
          <Tabs
            variant="pill"
            className="ag-date__cal"
            items={calendars.map(cal => ({
              id: cal,
              label: cal === 'j' ? text.jalali : text.gregorian
            }))}
            value={activeCalendar}
            onChange={switchCalendar}
          />
        )}
      </legend>
      <div className={cx('ag-date__grid', yearly && 'ag-date__grid--yearly')}>
        {!yearly && (
          <Select
            id={fieldId + '-y'}
            label={text.year}
            value={draft.year ? String(draft.year) : ''}
            placeholder={draft.year ? undefined : '—'}
            onChange={onPartChange('year')}
            aria-describedby={describedBy}
            options={yearOptions.map(year => ({value: String(year), label: localDigits(year)}))}
          />
        )}
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
