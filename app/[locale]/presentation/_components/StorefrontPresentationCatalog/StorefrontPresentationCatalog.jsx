import React from 'react';
import {Badge} from '../../../../../ui/components/Badge/Badge.jsx';
import {Button} from '../../../../../ui/components/Button/Button.jsx';
import {EmptyState} from '../../../../../ui/components/EmptyState/EmptyState.jsx';
import {IconButton} from '../../../../../ui/components/IconButton/IconButton.jsx';
import {Picture} from '../../../../../ui/components/Picture/Picture.jsx';
import {Price} from '../../../../../ui/components/Price/Price.jsx';

export function StorefrontPresentationCatalog({
  tiles,
  noResults,
  showPrices,
  readyLabel,
  emptyTitle,
  emptyBody,
  clearLabel,
  onClear,
  renderLabel
}) {
  return (
    <>
      {noResults ? (
        <div className="tw:flex tw:flex-col tw:items-center tw:gap-4 tw:py-8">
          <EmptyState icon="search-x" title={emptyTitle} body={emptyBody} />
          <Button variant="secondary" onClick={onClear}>
            <>{clearLabel}</>
          </Button>
        </div>
      ) : (
        <ul className="tw:list-none tw:m-0 tw:p-0 tw:grid tw:gap-5 tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))]">
          {tiles.map(tile => (
            <li key={tile.id} className="tw:relative">
              <button
                type="button"
                onClick={tile.open}
                aria-description={tile.openDescription}
                className="vf-presentation-tile tw:w-full tw:p-0 tw:[border:0] tw:bg-transparent tw:text-body tw:[font:inherit] tw:text-start tw:cursor-pointer tw:flex tw:flex-col tw:gap-2"
              >
                <span className="tw:relative tw:block tw:w-full tw:[aspect-ratio:4/5] tw:rounded-md tw:overflow-hidden tw:bg-muted">
                  <Picture
                    image={tile.image}
                    alt=""
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="tw:w-full tw:h-full tw:object-cover tw:block"
                  />
                  {tile.ready ? (
                    <span className="tw:absolute tw:top-3 tw:start-3">
                      <Badge tone="solid">
                        <>{readyLabel}</>
                      </Badge>
                    </span>
                  ) : null}
                </span>
                {/* Flex gaps need text separators too, so speech labels match visible words. */}{' '}
                <span className="tw:flex tw:items-baseline tw:justify-between tw:gap-3">
                  {renderLabel(tile)} {showPrices ? <Price value={tile.price} size="md" /> : null}
                </span>
              </button>
              <span className="tw:absolute tw:top-2 tw:end-2">
                <IconButton
                  icon="star"
                  label={tile.starLabel}
                  variant="raised"
                  active={tile.starred}
                  onClick={tile.star}
                />
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
