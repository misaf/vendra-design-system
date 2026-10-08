import React from 'react';
import {cx} from '../utils/cx.js';

const ARCH_RATIOS = {'4/5': '4 / 5', '3/4': '3 / 4', '4/3': '4 / 3', '1/1': '1 / 1'};

// The brand's image window: an arch (or circle, soft or square) on --radius-arch, with a
// striped placeholder until `src` is set. `ratio="fill"` stretches to the parent's height.
export function ArchFrame({
  src,
  srcSet,
  sizes,
  alt = '',
  ratio = '4/5',
  shape = 'arch',
  placeholder = true,
  placeholderLabel,
  ring,
  minHeight,
  tone = 'petal',
  size,
  zoomOnHover,
  objectPosition,
  children,
  className = '',
  style,
  ...rest
}) {
  const fill = ratio === 'fill' && shape !== 'circle';
  const aspectRatio =
    shape === 'circle'
      ? '1 / 1'
      : fill
        ? undefined
        : ARCH_RATIOS[ratio] || ratio.replace('/', ' / ');
  const thumb = size === 'thumb';
  const classes = cx(
    'ag-arch',
    'ag-arch--' + shape,
    ring && 'ag-arch--ring',
    fill && 'ag-arch--fill',
    tone === 'product' && 'ag-arch--product',
    thumb && 'ag-arch--thumb',
    zoomOnHover && 'ag-arch--zoom',
    className
  );
  return (
    <div
      className={classes}
      style={{aspectRatio, minHeight: fill ? minHeight : undefined, ...style}}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={objectPosition ? {objectPosition} : undefined}
        />
      ) : placeholder ? (
        <span className="ag-arch__ph" role={alt ? 'img' : undefined} aria-label={alt || undefined}>
          {thumb ? null : placeholderLabel}
        </span>
      ) : null}
      {children}
    </div>
  );
}
