import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

// A category tile (photo, name, count) that is a link with `href` or a button with `onClick`.
export function CategoryCard({
  label,
  count,
  image,
  srcSet,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  frame = 'arch',
  onClick,
  href,
  className = ''
}) {
  const inner = (
    <>
      <span className={cx('ag-cat__media', 'ag-product__media--' + frame)}>
        {image ? (
          <img
            src={image}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="ag-product__ph"></span>
        )}
      </span>
      <span className="ag-cat__row">
        <span className="ag-cat__label">{label}</span>
        <Icon name="arrow-right" size={16} className="ag-cat__arrow" />
      </span>
      {count && <span className="ag-cat__count">{count}</span>}
    </>
  );
  if (href)
    return (
      <a href={href} className={cx('ag-cat', className)} onClick={onClick}>
        {inner}
      </a>
    );
  return (
    <button type="button" className={cx('ag-cat', className)} onClick={onClick}>
      {inner}
    </button>
  );
}
