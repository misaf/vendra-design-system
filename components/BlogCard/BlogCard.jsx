import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';
export function BlogCard({
  image,
  srcSet,
  sizes,
  date,
  meta,
  title,
  excerpt,
  cta,
  onClick,
  href,
  frame = 'arch',
  aspect,
  layout = 'stack',
  headingLevel = 3,
  priority,
  className = ''
}) {
  const H = 'h' + headingLevel;
  const L = href ? 'a' : 'button';
  const wide = layout === 'wide';
  const sz = sizes || (wide ? '(max-width: 767px) 100vw, 55vw' : '(max-width: 767px) 100vw, 400px');
  return (
    <article className={cx('ag-blog', wide && 'ag-blog--wide', className)}>
      <div
        className={cx('ag-blog__media', 'ag-product__media--' + frame)}
        style={aspect ? {aspectRatio: aspect} : undefined}
      >
        {image ? (
          <img
            src={image}
            srcSet={srcSet}
            sizes={srcSet ? sz : undefined}
            alt=""
            loading={priority ? undefined : 'lazy'}
            fetchpriority={priority ? 'high' : undefined}
            decoding="async"
          />
        ) : (
          <span className="ag-product__ph"></span>
        )}
      </div>
      <div className="ag-blog__body">
        {date && <span className="ag-eyebrow ag-blog__date">{date}</span>}
        {meta && <div className="ag-blog__meta">{meta}</div>}
        <H className="ag-blog__title">
          <L
            href={href}
            type={href ? undefined : 'button'}
            className="ag-blog__link"
            onClick={onClick}
          >
            {title}
          </L>
        </H>
        {excerpt && <p className="ag-blog__excerpt">{excerpt}</p>}
        {cta && (
          <span className="ag-blog__cta" aria-hidden="true">
            {cta}
            <Icon name="arrow-right" size={16} />
          </span>
        )}
      </div>
    </article>
  );
}
