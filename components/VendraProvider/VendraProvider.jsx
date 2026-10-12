import React from 'react';
import {I18nProvider} from 'react-aria-components';
import {MessagesContext} from '../utils/messages.js';

// Sets the language for every component below it: React Aria's locale (number and date formats,
// keyboard direction) and the components' built-in wording (MESSAGES). `messages` adds a language
// or changes wording, by language then component: {fa: {Dialog: {close: 'بستن پنجره'}}}. A
// component's own props still win. Put it once around the app, with the page's lang.
export function VendraProvider({locale, messages, children}) {
  return (
    <I18nProvider locale={locale}>
      <MessagesContext.Provider value={messages || null}>{children}</MessagesContext.Provider>
    </I18nProvider>
  );
}
