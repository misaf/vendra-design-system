import React from 'react';
import {Alert} from '../Alert/Alert.jsx';
import {cx} from '../../utils/cx.js';
import {usePageLocale} from '../../utils/locale.js';
import {useMessages} from '../../utils/messages.js';
import {messages} from './messages.js';

const FOCUSABLE = 'input, select, textarea, button, [tabindex]:not([tabindex="-1"]), a[href]';

// Moves to a field from its link: scrolls it to the middle (its label stays in view) and focuses it,
// or the first control inside it when the target is a group or a map.
function goTo(event, target) {
  const element = document.getElementById(target);
  if (!element) return;
  event.preventDefault();
  const control =
    element.matches(FOCUSABLE) || element.tabIndex >= 0 || element.hasAttribute('tabindex')
      ? element
      : element.querySelector(FOCUSABLE) || element;
  element.scrollIntoView({block: 'center'});
  control.focus({preventScroll: true});
}

// After a failed submit: what to fix, in form order, each a link to its field. The app focuses it
// (it has tabIndex -1), or sets autoFocus; with a single error an app may focus that field instead.
// Renders nothing without errors.
export function ErrorSummary({errors = [], title, id, autoFocus = false, className, style}) {
  const {locale, ref} = usePageLocale();
  const text = useMessages('ErrorSummary', messages, {}, locale);
  const own = React.useRef(null);
  const count = errors.length;
  React.useEffect(() => {
    if (autoFocus && count && own.current) own.current.focus();
  }, [autoFocus, count > 0]);
  if (!count) return null;
  const heading =
    title ||
    (count === 1 ? text.one : text.other).replace(
      '{count}',
      new Intl.NumberFormat(locale).format(count)
    );
  return (
    <div
      ref={node => {
        own.current = node;
        ref.current = node;
      }}
      id={id}
      tabIndex={-1}
      className={cx('ag-error-summary', className)}
      style={style}
    >
      <Alert tone="danger" title={heading}>
        <ul className="ag-error-summary__list">
          {errors.map((error, index) => (
            <li key={index}>
              <a href={'#' + error.target} onClick={event => goTo(event, error.target)}>
                {error.text}
              </a>
            </li>
          ))}
        </ul>
      </Alert>
    </div>
  );
}
