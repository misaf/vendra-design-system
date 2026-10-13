import React from 'react';
import {Button as AriaButton} from 'react-aria-components';
import {Button} from '../Button/Button.jsx';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';
import {useClientLayoutEffect} from '../utils/effects.js';
import {usePageLocale} from '../utils/locale.js';
import {useMessages} from '../utils/messages.js';

// The filters that are on, each a button that removes it ("Remove Anniversary"), then "Clear all".
// `filters` are {id, label, onRemove}. After a removal, focus moves to the filter now in its place
// (or the one before, or "Clear all"); when the last one goes the bar is gone, so the app moves
// focus (e.g. to its result count), as it does for `onClearAll`. Renders nothing with no filters.
export function FilterBar({filters, onClearAll, label, clearAllLabel, className, style}) {
  const {locale, ref: barRef} = usePageLocale();
  const text = useMessages('FilterBar', {label, clearAll: clearAllLabel}, locale);
  const removedAt = React.useRef(null);
  const count = filters ? filters.length : 0;
  useClientLayoutEffect(() => {
    const index = removedAt.current;
    removedAt.current = null;
    if (index == null || !barRef.current) return;
    const buttons = barRef.current.querySelectorAll('.ag-filterbar__remove, .ag-filterbar__clear');
    buttons[Math.min(index, buttons.length - 1)]?.focus();
  }, [count]);
  if (!count) return null;
  return (
    <div
      ref={barRef}
      role="group"
      aria-label={text.label}
      className={cx('ag-filterbar', className)}
      style={style}
    >
      {filters.map((filter, index) => (
        <AriaButton
          key={filter.id ?? filter.label}
          className="ag-chip ag-chip--selected ag-filterbar__remove"
          aria-label={text.remove.replace('{label}', filter.label)}
          onPress={() => {
            removedAt.current = index;
            filter.onRemove();
          }}
        >
          {filter.label}
          <Icon name="x" size={14} className="ag-filterbar__x" />
        </AriaButton>
      ))}
      {onClearAll && (
        <Button variant="ghost" size="sm" className="ag-filterbar__clear" onClick={onClearAll}>
          {text.clearAll}
        </Button>
      )}
    </div>
  );
}
