# VendraProvider

Sets the language and the router for every component below it, once, around the app.

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

**Router:** pass the app router's `navigate` so the components' links (`Button href`, `NavLink`, `ProductCard`, `BottomTabBar`, `CategoryCard`, …) navigate client-side instead of reloading the page, and `useHref` when routes need a base path:

```jsx
'use client';
import {useRouter} from 'next/navigation';

export function Providers({locale, children}) {
  const router = useRouter();
  return (
    <VendraProvider locale={locale} navigate={router.push}>
      {children}
    </VendraProvider>
  );
}
```

Use this rather than importing React Aria's `RouterProvider` yourself. `react-aria-components` and `@internationalized/date` are peer dependencies, so your app and the components share one copy and its contexts. A nested `VendraProvider` without `navigate` keeps the outer router.

Without a provider, components use React Aria's locale (an `I18nProvider` higher up, or the browser's) and plain links.
