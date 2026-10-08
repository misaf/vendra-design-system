import React from 'react';
import {Button} from '../Button/Button.jsx';
import {cx} from '../utils/cx.js';

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

// Card-to-card transfer details: the card number in groups of four (always LTR) with a copy
// button, then holder, bank and amount. Persian digits in `cardNumber` are accepted.
export function PaymentCard({
  cardNumber = '',
  holder,
  bank,
  amount,
  labels = {},
  onCopy,
  className = ''
}) {
  const text = {
    card: 'Card number',
    holder: 'Card holder',
    bank: 'Bank',
    amount: 'Amount',
    copy: 'Copy',
    copied: 'Copied',
    ...labels
  };
  const digits = String(cardNumber)
    .replace(/[۰-۹]/g, digit => FA_DIGITS.indexOf(digit))
    .replace(/\D/g, '');
  const grouped = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  const [copied, setCopied] = React.useState(false);
  const resetTimer = React.useRef();
  React.useEffect(() => () => clearTimeout(resetTimer.current), []);
  const copy = () => {
    const done = () => {
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
      onCopy && onCopy(digits);
    };
    const fallback = () => {
      const scratch = document.createElement('textarea');
      scratch.value = digits;
      scratch.style.position = 'fixed';
      scratch.style.opacity = '0';
      document.body.appendChild(scratch);
      scratch.select();
      let copiedText = false;
      try {
        copiedText = document.execCommand('copy');
      } catch {}
      scratch.remove();
      // Only confirm when the copy actually happened; otherwise the digits stay visible to copy by hand.
      if (copiedText) done();
    };
    if (navigator.clipboard && navigator.clipboard.writeText)
      navigator.clipboard.writeText(digits).then(done, fallback);
    else fallback();
  };
  // [label, value, modifier class]
  const rows = [
    [text.holder, holder],
    [text.bank, bank],
    [text.amount, amount, 'amount']
  ].filter(([, value]) => value);
  return (
    <div className={cx('ag-pay', className)}>
      <div className="ag-pay__row">
        <div className="ag-pay__cardcol">
          <div className="ag-pay__k">{text.card}</div>
          <div className="ag-pay__num" dir="ltr">
            {grouped}
          </div>
        </div>
        <Button variant="secondary" iconStart={copied ? 'check' : 'copy'} onClick={copy}>
          {copied ? text.copied : text.copy}
        </Button>
      </div>
      {rows.length > 0 && (
        <dl className="ag-pay__meta">
          {rows.map(([label, value, modifier]) => (
            <div key={label} className={modifier ? 'ag-pay__' + modifier : undefined}>
              <dt className="ag-pay__k">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
      <span role="status" className="ag-sr-only">
        {copied ? text.copied : ''}
      </span>
    </div>
  );
}
