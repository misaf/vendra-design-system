# DatePicker

Jalali/Gregorian date picker: `<fieldset><legend>` with a pill calendar toggle, then year · month · day Selects. Needs the date helpers (`window.VendraDesignSystem_4ae5a2.dates`, bundled from `components/utils/dates.js`).

```jsx
<DatePicker lang="fa" label="تاریخ مراسم" value={iso} onChange={setIso} minDate={DATES.iso(new Date())}/>
<DatePicker lang="en" yearly label="Date" value={{cal:'j',m:7,d:9}} onChange={setDay}/>
```

- `value` is ISO `YYYY-MM-DD`; with `yearly` it is `{cal, m, d}` and the year select is hidden (2fr : 1fr grid).
- Default calendar: `j` for fa, `g` for en. Switching calendar keeps the same day (ISO value unchanged; yearly values are converted via this year).
- Changing year or month clamps the day with `daysInMonth` — Mehr 30 → Esfand 1404 becomes 29 and stays in 1404.
- Below it: "That’s {fullDate in the other calendar}" (fa «برابر با …»), `aria-live="polite"`.
- Errors follow Input: hint/error in `#{id}-hint`; the day Select carries `aria-invalid` + `aria-errormessage`, so `AG_NAV.focusFirstInvalid()` lands on it.
- Labels come in through `labels`; option labels use Persian digits in fa.

## Usage

**Use when:** Choosing delivery and reminder dates in Jalali or Gregorian.

**Don’t use when:** Don’t use for birthdays far in the past (plain Input) or time-of-day (ChoiceGroup).
