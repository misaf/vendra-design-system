import React from 'react';
import {Button} from '../../../../../ui/components/Button/Button.jsx';
import {Chip} from '../../../../../ui/components/Chip/Chip.jsx';
import {IconButton} from '../../../../../ui/components/IconButton/IconButton.jsx';
import {Lightbox} from '../../../../../ui/components/Lightbox/Lightbox.jsx';
import {Price} from '../../../../../ui/components/Price/Price.jsx';

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
    <Lightbox
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
                  <Price value={itemIndex === index ? item.quote : item.price} />
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
                      <Chip key={size.id} selected={size.selected} onClick={size.pick}>
                        <>{size.label}</>
                      </Chip>
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
                      <Chip key={addon.id} selected={addon.selected} onClick={addon.pick}>
                        <>{addon.label}</>
                      </Chip>
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
            <IconButton
              icon="star"
              label={item.starLabel}
              inverse={true}
              active={item.starred}
              onClick={item.star}
            />
            {!item.soldOut && (item.sizes.length || item.addons.length) ? (
              <IconButton
                icon="sliders-horizontal"
                label={labels.options}
                inverse={true}
                active={optionsOpen}
                onClick={onToggleOptions}
              />
            ) : null}
            {item.soldOut ? null : (
              <Button
                variant="soft"
                iconStart={item.added ? 'check' : 'plus'}
                onClick={item.addToOrder}
              >
                <>{item.added ? labels.added : labels.addOrder}</>
              </Button>
            )}
            {item.soldOut ? null : (
              <Button variant="primary" iconStart="send" onClick={item.sendIt}>
                <>{labels.send}</>
              </Button>
            )}
          </>
        );
      }}
    />
  );
}
