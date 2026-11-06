import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPresentationViewer({
  items,
  index,
  calm,
  showPrices,
  optionsOpen,
  slideshowRunning,
  labels,
  renderLabel,
  onIndexChange,
  onClose,
  onToggleOptions
}) {
  return (
    <DS.Lightbox
      label={labels.viewer}
      className={'vf-presentation-viewer' + (calm ? ' vf-presentation-viewer--calm' : '')}
      items={items.map((item, itemIndex) => ({
        id: item.id,
        images: item.images,
        caption: (
          <div className="tw:flex tw:flex-col tw:gap-3">
            <div className="tw:flex tw:items-baseline tw:gap-5 tw:flex-wrap">
              {renderLabel(item)}
              {showPrices ? (
                <span className="tw:text-xl">
                  <DS.Price value={itemIndex === index ? item.quote : item.price} />
                </span>
              ) : null}
            </div>
            {itemIndex === index &&
            optionsOpen &&
            !slideshowRunning &&
            !item.soldOut &&
            (item.sizes.length || item.addons.length) ? (
              <div className="vf-presentation-options tw:bg-card tw:text-body tw:rounded-md tw:p-3 tw:flex tw:flex-wrap tw:items-center tw:gap-x-5 tw:gap-y-3">
                {item.sizes.length ? (
                  <div
                    role="group"
                    aria-label={labels.size}
                    className="tw:flex tw:gap-2 tw:flex-wrap"
                  >
                    {item.sizes.map(size => (
                      <DS.Chip key={size.id} selected={size.selected} onClick={size.pick}>
                        <>{size.label}</>
                      </DS.Chip>
                    ))}
                  </div>
                ) : null}
                {item.addons.length ? (
                  <div
                    role="group"
                    aria-label={labels.extras}
                    className="tw:flex tw:gap-2 tw:flex-wrap"
                  >
                    {item.addons.map(addon => (
                      <DS.Chip key={addon.id} selected={addon.selected} onClick={addon.pick}>
                        <>{addon.label}</>
                      </DS.Chip>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        )
      }))}
      index={index}
      onIndexChange={onIndexChange}
      onClose={onClose}
      actions={(_, itemIndex) => {
        const item = items[itemIndex];
        return (
          <>
            <DS.IconButton
              icon="star"
              label={item.starLabel}
              inverse={true}
              active={item.starred}
              onClick={item.star}
            />
            {!item.soldOut && (item.sizes.length || item.addons.length) ? (
              <DS.IconButton
                icon="sliders-horizontal"
                label={labels.options}
                inverse={true}
                active={optionsOpen}
                onClick={onToggleOptions}
              />
            ) : null}
            {item.soldOut ? null : (
              <DS.Button
                variant="soft"
                iconStart={item.added ? 'check' : 'plus'}
                onClick={item.addToOrder}
              >
                <>{item.added ? labels.added : labels.addOrder}</>
              </DS.Button>
            )}
            {item.soldOut ? null : (
              <DS.Button variant="primary" iconStart="send" onClick={item.sendIt}>
                <>{labels.send}</>
              </DS.Button>
            )}
          </>
        );
      }}
    />
  );
}
