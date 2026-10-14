import React from 'react';
import {I18nProvider, RouterProvider} from 'react-aria-components';
import {MessagesContext} from '../utils/messages.js';
import {AnalyticsContext} from '../utils/track.js';

// Sets up every component below it: the language (React Aria's locale for number and date formats
// and keyboard direction, plus the components' built-in wording), and the app's router.
// `messages` adds a language or changes wording, by language then component:
// {fa: {Dialog: {close: 'بستن پنجره'}}}; a component's own props still win. `navigate` (the app
// router's push, e.g. Next.js's router.push) makes links (Button href, NavLink, ProductCard, ...)
// navigate client-side; `useHref` turns a route into a real href (e.g. adding a base path). A
// nested VendraProvider without `navigate` keeps the outer router. `onEvent(event)` receives the
// analytics events the components report (FilterBar, PaymentStatus, ResendCode, LanguageSwitch), in
// the shape of `analytics.event`; the app adds its own and sends them on after consent. Put one
// around the app.
export function VendraProvider({locale, messages, navigate, useHref, onEvent, children}) {
  const inner = (
    <MessagesContext.Provider value={messages || null}>{children}</MessagesContext.Provider>
  );
  const content = (
    <I18nProvider locale={locale}>
      {onEvent ? (
        <AnalyticsContext.Provider value={onEvent}>{inner}</AnalyticsContext.Provider>
      ) : (
        inner
      )}
    </I18nProvider>
  );
  return navigate ? (
    <RouterProvider navigate={navigate} useHref={useHref}>
      {content}
    </RouterProvider>
  ) : (
    content
  );
}
