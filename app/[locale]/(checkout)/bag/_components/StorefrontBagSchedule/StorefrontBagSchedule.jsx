import React from 'react';
import {Alert} from '../../../../../../ui/components/Alert/Alert.jsx';
import {ChoiceGroup} from '../../../../../../ui/components/ChoiceGroup/ChoiceGroup.jsx';
import {ChoiceTile} from '../../../../../../ui/components/ChoiceTile/ChoiceTile.jsx';

export function StorefrontBagSchedule({title, preparationNotice, review, day, slot}) {
  const dayFieldset = React.useRef(null);
  React.useEffect(() => {
    const scroller = dayFieldset.current?.querySelector('.ag-choices');
    const selected = scroller?.querySelector('.ag-choice[data-selected]');
    if (!selected || scroller.scrollWidth <= scroller.clientWidth) return;

    // Keep the selected date visible when returning to delivery, without moving the page.
    const viewport = scroller.getBoundingClientRect();
    const tile = selected.getBoundingClientRect();
    const padding = parseFloat(getComputedStyle(scroller).paddingInlineStart);
    const left = Math.min(0, tile.left - viewport.left - padding);
    const right = Math.max(0, tile.right - viewport.right + padding);
    if (left || right) scroller.scrollBy(left || right, 0);
  }, [day.value]);

  return (
    <section
      className="vf-bag-delivery tw:flex tw:flex-col tw:gap-4h"
      aria-labelledby="vf-when-title"
    >
      <h2
        id="vf-when-title"
        className="vf-bag-delivery-title tw:m-0 tw:font-display tw:font-medium tw:text-xl! tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]"
      >
        <>{title}</>
      </h2>
      {preparationNotice && <p className="ag-field__hint tw:m-0">{preparationNotice}</p>}
      {review && (
        <div id="vf-delivery-changed" tabIndex={-1}>
          <Alert tone="warning" title={review} />
        </div>
      )}
      <div id="vf-date" tabIndex={-1} data-vf-keep-focus>
        <ChoiceGroup
          ref={dayFieldset}
          className="vf-bag-days"
          legend={day.label}
          error={day.error}
          minTileWidth={104}
          value={day.value}
          onChange={day.onChange}
        >
          {day.options.map((d, $index) => (
            <React.Fragment key={$index}>
              <ChoiceTile
                size="sm"
                value={d?.value}
                label={d?.label}
                description={d?.desc}
                disabled={d?.off}
              />
            </React.Fragment>
          ))}
        </ChoiceGroup>
      </div>
      <div id="vf-slot" tabIndex={-1} data-vf-keep-focus>
        <ChoiceGroup
          legend={slot.label}
          error={slot.error}
          minTileWidth={130}
          value={slot.value}
          onChange={slot.onChange}
        >
          {slot.options.map(z => (
            <ChoiceTile
              key={z.value}
              size="sm"
              value={z.value}
              label={z.label}
              description={z.desc}
              disabled={z.off}
            />
          ))}
        </ChoiceGroup>
      </div>
    </section>
  );
}
