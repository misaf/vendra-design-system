import React from 'react';
import {Button, Link} from 'react-aria-components';
import {Badge} from '../Badge/Badge.jsx';
import {IconButton} from '../IconButton/IconButton.jsx';
import {StockStatus} from '../StockStatus/StockStatus.jsx';
import {cx} from '../utils/cx.js';
import {useMessages} from '../utils/messages.js';

// The product name is the one interactive target: a React Aria Link (or Button without href) with a stretched ::after covering the card.
export function ProductCard({
  name,
  subtitle,
  price,
  compareAt,
  stock,
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
  placeholder,
  favLabel
}) {
  const text = useMessages('ProductCard', {placeholder, favorite: favLabel});
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
    <Link href={href} className="ag-product__link" aria-label={accessibleName} onClick={onClick}>
      {name}
    </Link>
  ) : onClick ? (
    <Button className="ag-product__link" aria-label={accessibleName} onClick={onClick}>
      {name}
    </Button>
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
        {mainPhoto ? (
          renderPhoto(mainPhoto)
        ) : (
          <div className="ag-product__ph">{text.placeholder}</div>
        )}
        {hoverPhoto && renderPhoto(hoverPhoto, 'ag-product__alt')}
        {badge && (
          <Badge tone={badgeTone} className="ag-product__badge">
            {badge}
          </Badge>
        )}
        {onFavorite && (
          <IconButton
            icon="heart"
            label={text.favorite}
            variant="raised"
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
        {stock && <StockStatus stock={stock} hideInStock size="sm" className="ag-product__stock" />}
      </div>
    </div>
  );
}
