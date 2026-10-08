import React from 'react';
import {Badge} from '../Badge/Badge.jsx';
import {IconButton} from '../IconButton/IconButton.jsx';
import {cx} from '../utils/cx.js';

// The product name is the one interactive target: <a href> (or <button> without href) with a stretched ::after covering the card.
export function ProductCard({
  name,
  subtitle,
  price,
  compareAt,
  image,
  srcSet,
  images,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  badge,
  badgeTone = 'neutral',
  frame = 'arch',
  tone,
  favorite,
  onFavorite,
  onClick,
  href,
  linkLabel,
  placeholder = 'Bouquet photo',
  favLabel = 'Save'
}) {
  const photos = (images && images.length ? images : image ? [{src: image, srcSet}] : []).map(
    photo => (typeof photo === 'string' ? {src: photo} : photo)
  );
  // The second photo crossfades in on hover; it is decorative, so its alt is empty.
  const [mainPhoto, hoverPhoto] = photos;
  const renderPhoto = (photo, className) => (
    <img
      className={className}
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={photo.srcSet ? sizes : undefined}
      alt={className ? '' : photo.alt || name}
      loading="lazy"
      decoding="async"
      style={
        photo.crop
          ? {objectPosition: photo.crop, transform: 'scale(1.6)', transformOrigin: photo.crop}
          : undefined
      }
    />
  );
  const accessibleName =
    linkLabel ??
    (typeof name === 'string' && typeof price === 'string' ? name + ' — ' + price : undefined);
  const linked = !!(href || onClick);
  const title = href ? (
    <a href={href} className="ag-product__link" aria-label={accessibleName} onClick={onClick}>
      {name}
    </a>
  ) : onClick ? (
    <button
      type="button"
      className="ag-product__link"
      aria-label={accessibleName}
      onClick={onClick}
    >
      {name}
    </button>
  ) : (
    name
  );
  return (
    <div className={cx('ag-product', linked && 'ag-product--link')}>
      <div
        className={cx(
          'ag-product__media',
          'ag-product__media--' + frame,
          tone === 'product' && 'ag-arch--product'
        )}
      >
        {mainPhoto ? renderPhoto(mainPhoto) : <div className="ag-product__ph">{placeholder}</div>}
        {hoverPhoto && renderPhoto(hoverPhoto, 'ag-product__alt')}
        {badge && (
          <Badge tone={badgeTone} className="ag-product__badge">
            {badge}
          </Badge>
        )}
        {onFavorite && (
          <IconButton
            icon="heart"
            label={favLabel}
            variant="solid"
            size="sm"
            active={favorite}
            className="ag-product__fav"
            onClick={event => {
              event.stopPropagation();
              onFavorite();
            }}
          />
        )}
      </div>
      <div>
        <h3 className="ag-product__name">{title}</h3>
        <div className="ag-product__meta">
          <span className="ag-product__sub">{subtitle}</span>
          <span className="ag-product__price">
            {compareAt && <s>{compareAt}</s>}
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}
