import React from 'react';
import * as DS from '../../ds.js';

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
        <DS.SearchField
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
          <DS.Chip key={kind.id} selected={kind.selected} onClick={kind.pick}>
            <>{kind.label}</>
          </DS.Chip>
        ))}
      </div>
      <div className="vf-presentation-tools tw:flex tw:items-center tw:gap-1">
        <DS.IconButton icon="play" label={resume.label} onClick={resume.onClick} />
        <div
          role="status"
          className="vf-presentation-count tw:text-sm tw:text-quiet tw:whitespace-nowrap tw:me-2"
        >
          <>{countLabel}</>
        </div>
        {scan ? <DS.IconButton icon="camera" label={scan.label} onClick={scan.onClick} /> : null}
        <DS.IconButton
          icon="star"
          label={shortlist.label}
          count={shortlist.count}
          onClick={shortlist.onClick}
        />
        <DS.IconButton
          icon="shopping-bag"
          label={order.label}
          count={order.count}
          onClick={order.onClick}
        />
        {startOver ? (
          <DS.IconButton icon="rotate-ccw" label={startOver.label} onClick={startOver.onClick} />
        ) : null}
        <DS.IconButton icon="settings" label={settings.label} onClick={settings.onClick} />
      </div>
    </>
  );
}
