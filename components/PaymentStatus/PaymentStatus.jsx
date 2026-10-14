import React from 'react';
import {Button} from '../Button/Button.jsx';
import {DetailList} from '../DetailList/DetailList.jsx';
import {EmptyState} from '../EmptyState/EmptyState.jsx';
import {Spinner} from '../Spinner/Spinner.jsx';
import {cx} from '../utils/cx.js';
import {usePageLocale} from '../utils/locale.js';
import {useMessages} from '../utils/messages.js';
import {useTrack} from '../utils/track.js';

const RESULTS = ['paid', 'cancelled', 'failed', 'pending'];
const LOOK = {
  redirecting: {tone: 'neutral'},
  verifying: {tone: 'neutral'},
  paid: {icon: 'circle-check', tone: 'accent'},
  cancelled: {icon: 'circle-x', tone: 'neutral'},
  failed: {icon: 'circle-alert', tone: 'danger'},
  pending: {icon: 'clock', tone: 'neutral'}
};

// The trip to the bank's payment page and back. `redirecting` sends the browser to the gateway
// (`redirect`: its URL, GET or POST, and the fields it expects) with a button in case that doesn't
// happen; `verifying` waits while the store confirms with the bank; then `paid`, `cancelled`,
// `failed` (pay again or choose another method) or `pending`: the bank hasn't confirmed, so the
// customer must not pay twice. When the status changes, focus moves to the new heading. Each answer
// (paid, cancelled, failed, pending) reports `payment_result` once (VendraProvider's onEvent).
export function PaymentStatus({
  status,
  amount,
  orderNumber,
  reference,
  gateway,
  redirect,
  redirectDelay = 1500,
  onRetry,
  onOtherMethod,
  onCheckAgain,
  supportHref,
  headingLevel = 2,
  children,
  className,
  style
}) {
  // The wording follows the nearest lang, as the page around it is written.
  const {locale, ref: rootRef} = usePageLocale();
  const text = useMessages('PaymentStatus', {}, locale);
  const formRef = React.useRef(null);
  const firstStatus = React.useRef(status);
  const reported = React.useRef(null);
  const track = useTrack();
  const look = LOOK[status] || LOOK.pending;
  const waiting = status === 'redirecting' || status === 'verifying';

  React.useEffect(() => {
    if (status === firstStatus.current) return;
    firstStatus.current = null;
    const heading = rootRef.current && rootRef.current.querySelector('.ag-empty__title');
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus();
  }, [status]);

  React.useEffect(() => {
    if (!RESULTS.includes(status) || reported.current === status) return;
    reported.current = status;
    track('payment_result', {status, transaction_id: orderNumber});
  }, [status, orderNumber, track]);

  React.useEffect(() => {
    if (status !== 'redirecting' || !redirect || redirectDelay == null) return;
    const timer = setTimeout(() => formRef.current && formRef.current.submit(), redirectDelay);
    return () => clearTimeout(timer);
  }, [status, redirect, redirectDelay]);

  const words = text[status] || text.pending;
  const actions = [];
  if (status === 'redirecting' && redirect) {
    const method = (redirect.method || 'GET').toUpperCase() === 'POST' ? 'post' : 'get';
    actions.push(
      <form key="go" ref={formRef} method={method} action={redirect.url}>
        {Object.entries(redirect.fields || {}).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
        <Button type="submit" variant="primary" iconEnd="external-link">
          {text.goToBank}
        </Button>
      </form>
    );
  }
  if ((status === 'failed' || status === 'cancelled') && onRetry)
    actions.push(
      <Button key="retry" variant="primary" iconStart="rotate-ccw" onClick={onRetry}>
        {text.retry}
      </Button>
    );
  if ((status === 'failed' || status === 'cancelled') && onOtherMethod)
    actions.push(
      <Button key="other" variant="ghost" onClick={onOtherMethod}>
        {text.otherMethod}
      </Button>
    );
  if (status === 'pending' && onCheckAgain)
    actions.push(
      <Button key="check" variant="primary" iconStart="refresh-cw" onClick={onCheckAgain}>
        {text.checkAgain}
      </Button>
    );
  if ((status === 'pending' || status === 'failed') && supportHref)
    actions.push(
      <Button key="support" variant="ghost" iconStart="phone" href={supportHref}>
        {text.support}
      </Button>
    );

  const details = [
    amount && {icon: 'banknote', label: text.amount, value: amount},
    orderNumber && {icon: 'receipt', label: text.order, value: <bdi>{orderNumber}</bdi>},
    reference && {icon: 'shield-check', label: text.reference, value: <bdi>{reference}</bdi>}
  ].filter(Boolean);

  return (
    <div
      ref={rootRef}
      className={cx('ag-payment-status', 'ag-payment-status--' + status, className)}
      style={style}
      aria-busy={waiting || undefined}
    >
      <EmptyState
        icon={waiting ? <Spinner size={28} label={words.title} /> : look.icon}
        tone={look.tone}
        title={words.title}
        body={words.body.replace('{gateway}', gateway || text.bank)}
        headingLevel={headingLevel}
        actions={
          actions.length || children ? (
            <>
              {actions}
              {children}
            </>
          ) : null
        }
      />
      {details.length > 0 && <DetailList className="ag-payment-status__details" rows={details} />}
    </div>
  );
}
