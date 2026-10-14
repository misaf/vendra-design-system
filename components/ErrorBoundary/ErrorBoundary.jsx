import React from 'react';
import {Alert} from '../Alert/Alert.jsx';
import {Button} from '../Button/Button.jsx';
import {usePageLocale} from '../utils/locale.js';
import {useMessages} from '../utils/messages.js';
import {messages} from './messages.js';

// The default stand-in: a quiet note (role="status", not an alarm: the rest of the page works) with
// Try again, in the page's language.
function Fallback({title, retryLabel, retry, className}) {
  const {locale, ref} = usePageLocale();
  const text = useMessages('ErrorBoundary', messages, {title, retry: retryLabel}, locale);
  return (
    <div ref={ref} className={className}>
      <Alert
        tone="neutral"
        icon="circle-alert"
        title={text.title}
        action={
          <Button size="sm" variant="secondary" iconStart="rotate-ccw" onClick={retry}>
            {text.retry}
          </Button>
        }
      />
    </div>
  );
}

class Boundary extends React.Component {
  state = {error: null};
  static getDerivedStateFromError(error) {
    return {error};
  }
  componentDidCatch(error, info) {
    if (this.props.onError) this.props.onError(error, info);
    else console.error(error);
  }
  componentDidUpdate(previous) {
    if (this.state.error && previous.resetKey !== this.props.resetKey) this.setState({error: null});
  }
  retry = () => this.setState({error: null});
  render() {
    const {error} = this.state;
    if (!error) return this.props.children;
    const {fallback, title, retryLabel, className} = this.props;
    if (typeof fallback === 'function') return fallback({error, retry: this.retry});
    if (fallback !== undefined) return fallback;
    return (
      <Fallback title={title} retryLabel={retryLabel} retry={this.retry} className={className} />
    );
  }
}

// Keeps one part of a page from blanking the whole page: when something inside fails while
// rendering, that part becomes a short note with Try again (which renders it afresh), and the rest of
// the page carries on. `onError` reports the failure (to the app's error log); `resetKey` clears it
// when it changes (a new product, a new route). Errors in event handlers and effects' async work
// aren't caught: handle those where they happen.
export function ErrorBoundary(props) {
  return <Boundary {...props} />;
}
