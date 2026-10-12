# DatePicker

Jalali/Gregorian date picker: `<fieldset><legend>` with a pill calendar toggle, then React Aria's DatePicker: a typed field (one segment each for day, month and year, ↑/↓ to step) and a calendar button that opens a month grid in the chosen calendar (Shamsi grids start on Saturday in Persian). Yearly dates use month · day Selects. Needs the date helpers (`window.VendraDesignSystem.dates`, bundled from `components/utils/dates.js`).

```jsx
<DatePicker lang="fa" label="تاریخ مراسم" value={iso} onChange={setIso} minDate={DATES.iso(new Date())}/>
<DatePicker lang="en" yearly label="Date" value={{cal:'j',m:7,d:9}} onChange={setDay}/>
```

- `value` is ISO `YYYY-MM-DD` (always Gregorian, whatever the calendar shown); with `yearly` it is `{cal, m, d}`, picked from month and day Selects (2fr : 1fr grid).
- `minDate` and `years` bound the grid: earlier days and days after the last of `years` years are off.
- Default calendar: `j` for fa, `g` for en. Switching calendar keeps the same day (ISO value unchanged; yearly values are converted via this year).
- Yearly: changing the month clamps the day (Mehr 30 → Esfand becomes 29).
- Below it: "That’s {fullDate in the other calendar}" (fa «برابر با …»), `aria-live="polite"`.
- Errors follow Input: hint/error in `#{id}-hint`; the date segments (yearly: the day Select) are marked invalid, so a form that focuses its first invalid control lands on them.
- Labels come in through `labels` (`open`, `previous`, `next` name the calendar buttons); digits follow `lang`.

> Changed in 0.2: the dated picker is a typed field with a calendar grid instead of three Selects.

## Usage

**Use when:** Choosing delivery and reminder dates in Jalali or Gregorian.

**Don’t use when:** Don’t use for birthdays far in the past (plain Input) or time-of-day (ChoiceGroup).
