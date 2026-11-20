import React from 'react';
import {Chip} from '../../../../design-system/components/Chip/Chip.jsx';
import {IconButton} from '../../../../design-system/components/IconButton/IconButton.jsx';
import {SearchField} from '../../../../design-system/components/SearchField/SearchField.jsx';

export function StorefrontPresentationToolbar({
  search,
  categoryLabel,
  kinds,
  countLabel,
  resume,
  scan,
  shortlist,
  order,
  startOver,
  settings
}) {
  return (
    <>
      <div className="vf-presentation-search tw:min-w-0">
        <SearchField
          id="vf-presentation-q"
          aria-label={search.label}
          placeholder={search.placeholder}
          value={search.value}
          onChange={search.onChange}
          onSubmit={search.onSubmit}
        />
      </div>
      <div
        role="group"
        aria-label={categoryLabel}
        className="vf-presentation-kinds tw:min-w-0 tw:flex tw:gap-2 tw:overflow-x-auto"
      >
        {kinds.map(kind => (
          <Chip key={kind.id} selected={kind.selected} onClick={kind.pick}>
            <>{kind.label}</>
          </Chip>
        ))}
      </div>
      <div className="vf-presentation-tools tw:flex tw:items-center tw:gap-1">
        <IconButton icon="play" label={resume.label} onClick={resume.onClick} />
        <div
          role="status"
          className="vf-presentation-count tw:text-sm tw:text-quiet tw:whitespace-nowrap tw:me-2"
        >
          <>{countLabel}</>
        </div>
        {scan ? <IconButton icon="camera" label={scan.label} onClick={scan.onClick} /> : null}
        <IconButton
          icon="star"
          label={shortlist.label}
          count={shortlist.count}
          onClick={shortlist.onClick}
        />
        <IconButton
          icon="shopping-bag"
          label={order.label}
          count={order.count}
          onClick={order.onClick}
        />
        {startOver ? (
          <IconButton icon="rotate-ccw" label={startOver.label} onClick={startOver.onClick} />
        ) : null}
        <IconButton icon="settings" label={settings.label} onClick={settings.onClick} />
      </div>
    </>
  );
}
