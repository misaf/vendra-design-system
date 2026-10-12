# VendraProvider

Sets the language for every component below it, once, around the app.

```jsx
<VendraProvider locale={lang === 'fa' ? 'fa-IR' : 'en-US'}>
  <App />
</VendraProvider>
```

- **Built-in wording:** components that name their own buttons or labels (Dialog's close button, Carousel's previous/next, QuantityInput's −/+, DatePicker's calendar, PaymentCard's copy, and so on) use the English or Persian wording from `MESSAGES` (`components/utils/messages.js`), so a Persian page never falls back to English. A component's props (`closeLabel`, `labels`, …) still win.
- **React Aria's locale:** it wraps React Aria's `I18nProvider`, so number and date formats and keyboard direction follow `locale`. Components that follow the page's `lang` attribute (QuantityInput, RangeSlider, Select, Tabs, RadioGroup, ChoiceGroup) still do.
- **Another language or other wording:** pass `messages`, by language then component. Missing entries fall back to the built-in catalog, then English.

```jsx
<VendraProvider
  locale="ar-AE"
  messages={{ar: {Dialog: {close: 'إغلاق'}, Carousel: {previous: 'السابق', next: 'التالي'}}}}
>
```

Without a provider, components use React Aria's locale (an `I18nProvider` higher up, or the browser's).
