import React from 'react';
import {Button, Link} from 'react-aria-components';
import {Icon} from '../../atoms/Icon/Icon.jsx';
import {Picture} from '../../atoms/Picture/Picture.jsx';
import {cx} from '../../utils/cx.js';

// A category tile (photo, name, count) that is a link with `href` or a button with `onClick`.
// frame="circle" is the small round version for a quick row of categories.
export function CategoryCard({
  label,
  count,
  image,
  priority,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  frame = 'arch',
  aspect,
  onClick,
  href,
  className = ''
}) {
  const inner = (
    <>
      <span
        className={cx('ag-cat__media', 'ag-product__media--' + frame)}
        style={aspect ? {aspectRatio: aspect} : undefined}
      >
        {image ? (
          <Picture image={image} sizes={sizes} alt="" priority={priority} />
        ) : (
          <span className="ag-product__ph"></span>
        )}
      </span>
      <span className="ag-cat__row">
        <span className="ag-cat__label">{label}</span>
        {frame !== 'circle' && <Icon name="arrow-right" size={16} className="ag-cat__arrow" />}
      </span>
      {count && <span className="ag-cat__count">{count}</span>}
    </>
  );
  if (href)
    return (
      <Link href={href} className={cx('ag-cat', 'ag-cat--' + frame, className)} onClick={onClick}>
        {inner}
      </Link>
    );
  return (
    <Button className={cx('ag-cat', 'ag-cat--' + frame, className)} onClick={onClick}>
      {inner}
    </Button>
  );
}
