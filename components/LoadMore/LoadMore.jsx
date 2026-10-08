import React from 'react';
import {Button} from '../Button/Button.jsx';
import {cx} from '../utils/cx.js';

// "Show more" for a long list: how many of the total are showing, a progress bar, and a button that
// loads the next page. `href` makes the button a real link to the next page (it works without
// JavaScript and for crawlers); `onClick` loads in place. When everything is showing, only the
// status stays.
export function LoadMore({
  shown,
  total,
  status,
  label,
  href,
  onClick,
  busy = false,
  className = '',
  style
}) {
  const percent = total > 0 ? Math.min(100, Math.round((shown / total) * 100)) : 100;
  return (
    <div className={cx('ag-loadmore', className)} style={style}>
      <p className="ag-loadmore__status" role="status">
        {status}
      </p>
      <div className="ag-loadmore__bar" aria-hidden="true">
        <span className="ag-loadmore__fill" style={{inlineSize: percent + '%'}} />
      </div>
      {shown < total && (
        <Button variant="secondary" href={href} onClick={onClick} loading={busy}>
          {label}
        </Button>
      )}
    </div>
  );
}
