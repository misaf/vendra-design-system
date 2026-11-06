import React from 'react';
import {Button} from '../../atoms/Button/Button.jsx';
import {Icon} from '../../atoms/Icon/Icon.jsx';
import {Input} from '../../atoms/Input/Input.jsx';
import {cx} from '../../utils/cx.js';
import {usePageLocale} from '../../utils/locale.js';
import {useMessages} from '../../utils/messages.js';
import {messages} from './messages.js';

// A discount code: a field with Apply inside its end, then, once the app accepts the code, a status
// line ("ROSES15 · 15% off") with Remove. The app checks the code (onApply gets it trimmed) and says
// why it was refused in `error`. No <form> of its own, so it can sit inside a checkout form: Enter
// in the field applies. Focus follows: to the field when a code is refused or removed, to Remove
// once one is applied (the status line is announced). `collapsible` tucks the field behind a
// "Have a promo code?" disclosure button that opens it and moves focus into it; it opens by itself
// once there is a code (typed, prefilled from a link or campaign, refused or applied).
export function PromoCodeField({
  id = 'ag-promo',
  value,
  onChange,
  onApply,
  error,
  applied,
  onRemove,
  busy = false,
  collapsible = false,
  defaultOpen = false,
  label,
  applyLabel,
  removeLabel,
  revealLabel,
  className,
  style
}) {
  const {locale, ref} = usePageLocale();
  const text = useMessages(
    'PromoCodeField',
    messages,
    {label, apply: applyLabel, remove: removeLabel, reveal: revealLabel},
    locale
  );
  const [draft, setDraft] = React.useState('');
  const code = value ?? draft;
  const hasCode = Boolean(code || error || applied);
  const [open, setOpen] = React.useState(defaultOpen || hasCode);
  const expanded = !collapsible || open;
  const focusOnOpen = React.useRef(false);
  // A code that arrives later (a campaign link, a refused or applied code) opens the field.
  React.useEffect(() => {
    if (hasCode) setOpen(true);
  }, [hasCode]);
  React.useEffect(() => {
    if (!open || !focusOnOpen.current) return;
    focusOnOpen.current = false;
    document.getElementById(id)?.focus();
  }, [open, id]);
  const appliedRef = React.useRef(null);
  const before = React.useRef({applied, error});
  React.useEffect(() => {
    const was = before.current;
    before.current = {applied, error};
    if (applied && !was.applied) appliedRef.current?.querySelector('button')?.focus();
    else if ((!applied && was.applied) || (error && error !== was.error))
      document.getElementById(id)?.focus();
  }, [applied, error, id]);
  const change = next => {
    if (value === undefined) setDraft(next);
    onChange?.(next);
  };
  const apply = () => {
    if (!busy && code.trim()) onApply?.(code.trim());
  };
  return (
    <div ref={ref} className={cx('ag-promo', className)} style={style}>
      {applied ? (
        <div ref={appliedRef} className="ag-promo__applied" role="status">
          <span className="ag-promo__code">
            <Icon name="tag" size={16} />
            {applied}
          </span>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            {text.remove}
          </Button>
        </div>
      ) : (
        <>
          {collapsible ? (
            <Button
              variant="ghost"
              size="sm"
              iconEnd="chevron-down"
              className="ag-promo__toggle"
              aria-expanded={expanded}
              aria-controls={id + '-panel'}
              onClick={() => {
                focusOnOpen.current = !open;
                setOpen(!open);
              }}
            >
              {text.reveal}
            </Button>
          ) : null}
          <div id={id + '-panel'} className="ag-promo__panel" hidden={!expanded}>
            <label
              id={id + '-label'}
              className={collapsible ? 'ag-sr-only' : 'ag-field__label'}
              htmlFor={id}
            >
              {text.label}
            </label>
            <div className="ag-promo__row">
              <Input
                id={id}
                aria-labelledby={id + '-label'}
                value={code}
                onChange={change}
                onKeyDown={event => {
                  if (event.key !== 'Enter') return;
                  event.preventDefault();
                  apply();
                }}
                error={error}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                dir="ltr"
              />
              <div className="ag-promo__apply">
                <Button variant="ghost" size="sm" loading={busy} onClick={apply}>
                  {text.apply}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
