import React from 'react';
import {I18nProvider, RouterProvider} from 'react-aria-components';
import {MessagesContext} from '../utils/messages.js';
import {AnalyticsContext} from '../utils/track.js';
import {DensityContext} from '../utils/density.js';

// Sets up every component below it: the language (React Aria's locale for number and date formats
// and keyboard direction, plus the components' built-in wording), and the app's router.
// `messages` adds a language or changes wording, by language then component:
// {fa: {Dialog: {close: 'بستن پنجره'}}}; a component's own props still win. `navigate` (the app
// router's push, e.g. Next.js's router.push) makes links (Button href, NavLink, ProductCard, ...)
// navigate client-side; `useHref` turns a route into a real href (e.g. adding a base path). A
// `onEvent(event)` receives the
// analytics events the components report (FilterBar, PaymentStatus, ResendCode, LanguageSwitch), in
// the shape of `analytics.event`; the app adds its own and sends them on after consent. `density`
// ('compact', 'comfortable' or 'tv') reaches the overlays, which open outside the page's flow; set
// the same value as `data-density` on the container it applies to. Put one around the app; a
// nested one changes only the props it is given and keeps the outer ones.
export function VendraProvider({locale, messages, navigate, useHref, onEvent, density, children}) {
  let content = children;
  if (density)
    content = <DensityContext.Provider value={density}>{content}</DensityContext.Provider>;
  if (onEvent)
    content = <AnalyticsContext.Provider value={onEvent}>{content}</AnalyticsContext.Provider>;
  if (messages)
    content = <MessagesContext.Provider value={messages}>{content}</MessagesContext.Provider>;
  if (locale) content = <I18nProvider locale={locale}>{content}</I18nProvider>;
  if (navigate)
    content = (
      <RouterProvider navigate={navigate} useHref={useHref}>
        {content}
      </RouterProvider>
    );
  return content;
}
