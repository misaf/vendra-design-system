// Shown when a page's code fails to load (a dropped connection, or a deploy that replaced the files
// while the tab was open): an alert with a reload instead of a blank screen.
import React from 'react';
import {Alert} from '../../components/molecules/Alert/Alert.jsx';
import {Button} from '../../components/atoms/Button/Button.jsx';
import {VF_STORE} from '../_shared/store-config.js';

const COPY = {
  en: {
    title: 'This page didn’t load.',
    body: 'Check your connection and reload.',
    reload: 'Reload'
  },
  fa: {
    title: 'این صفحه بارگذاری نشد.',
    body: 'اتصال اینترنت را بررسی کنید و دوباره بارگذاری کنید.',
    reload: 'بارگذاری دوباره'
  }
};

export function PageError() {
  const lang = new URLSearchParams(location.search).get('lang') === 'fa' ? 'fa' : 'en';
  const copy = COPY[lang];
  React.useEffect(() => {
    document.title = copy.title + ' · ' + VF_STORE.brand[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);
  return (
    <main
      id="main"
      lang={lang}
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
      style={{maxWidth: 560, margin: '48px auto', padding: '0 16px'}}
    >
      <Alert
        tone="danger"
        title={copy.title}
        action={
          <Button size="sm" variant="secondary" onClick={() => location.reload()}>
            {copy.reload}
          </Button>
        }
      >
        {copy.body}
      </Alert>
    </main>
  );
}

// Catches a page that failed to load below it and shows PageError, until `view` changes (it isn't
// keyed by view: a remounted Suspense boundary would blank the screen on every navigation).
export class PageBoundary extends React.Component {
  state = {failed: false, view: this.props.view};
  static getDerivedStateFromError() {
    return {failed: true};
  }
  static getDerivedStateFromProps(props, state) {
    return props.view === state.view ? null : {failed: false, view: props.view};
  }
  componentDidCatch(error) {
    console.error(error);
  }
  render() {
    return this.state.failed ? <PageError /> : this.props.children;
  }
}
