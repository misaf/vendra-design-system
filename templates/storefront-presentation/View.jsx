// StorefrontPresentation: the counter presentation, full screen without the site's header or footer.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {Shell} from '../app/Shell.jsx';
import {vfQrPath} from '../_shared/qr.js';

function Qr({text, label}) {
  const {path, size} = React.useMemo(() => vfQrPath(text), [text]);
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={'0 0 ' + size + ' ' + size}
      shapeRendering="crispEdges"
      className="vf-presentation-qr tw:block tw:w-full tw:max-w-[280px] tw:mx-auto tw:rounded-md"
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
}

export function View({v}) {
  return (
    <Shell
      v={v}
      bare={true}
      content={
        <main
          id="main"
          tabIndex={-1}
          className="vf-presentation tw:min-h-screen tw:bg-page tw:text-body tw:flex tw:flex-col"
        >
          <h1 className="ag-sr-only">
            <>{v.t?.title}</>
          </h1>
          <div className="vf-presentation-bar tw:sticky tw:top-0 tw:z-header tw:bg-header tw:[backdrop-filter:blur(10px)] tw:[border-bottom:1px_solid_var(--border-subtle)]">
            <div className="tw:mx-auto tw:max-w-page tw:px-gutter tw:py-3 tw:flex tw:flex-col tw:gap-3">
              <div className="tw:flex tw:items-end tw:gap-3">
                <div className="tw:flex-1 tw:min-w-0">
                  <DS.SearchField
                    id="vf-presentation-q"
                    label={v.t?.search}
                    placeholder={v.t?.searchHint}
                    value={v.q}
                    onChange={v.setQ}
                    onSubmit={v.submitQ}
                  />
                </div>
                <DS.IconButton
                  icon="settings"
                  label={v.t?.settings}
                  variant="secondary"
                  onClick={v.openSettings}
                />
              </div>
              <div className="tw:flex tw:items-center tw:justify-between tw:gap-3 tw:flex-wrap">
                <div
                  role="group"
                  aria-label={v.t?.categories}
                  className="tw:flex tw:gap-2 tw:flex-wrap"
                >
                  {list(v.kinds).map(kind => (
                    <DS.Chip key={kind.id} selected={kind.selected} onClick={kind.pick}>
                      <>{kind.label}</>
                    </DS.Chip>
                  ))}
                </div>
                <div role="status" className="tw:text-sm tw:text-quiet">
                  <>{v.countLabel}</>
                </div>
              </div>
            </div>
          </div>
          <div className="tw:flex-1">
            <div className="tw:mx-auto tw:max-w-page tw:px-gutter tw:py-5">
              {v.noResults ? (
                <div className="tw:flex tw:flex-col tw:items-center tw:gap-4 tw:py-8">
                  <DS.EmptyState icon="search-x" title={v.t?.none} body={v.t?.noneBody} />
                  <DS.Button variant="secondary" onClick={v.showAll}>
                    <>{v.t?.showAll}</>
                  </DS.Button>
                </div>
              ) : (
                <ul className="tw:list-none tw:m-0 tw:p-0 tw:grid tw:gap-5 tw:[grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
                  {list(v.tiles).map(tile => (
                    <li key={tile.id}>
                      <button
                        type="button"
                        onClick={tile.open}
                        aria-label={tile.openLabel}
                        className="vf-presentation-tile tw:w-full tw:p-0 tw:[border:0] tw:bg-transparent tw:text-body tw:[font:inherit] tw:text-start tw:cursor-pointer tw:flex tw:flex-col tw:gap-2"
                      >
                        <span className="tw:relative tw:block tw:w-full tw:[aspect-ratio:4/5] tw:rounded-md tw:overflow-hidden tw:bg-muted">
                          <DS.Picture
                            image={tile.image}
                            sizes="(max-width: 767px) 100vw, 33vw"
                            className="tw:w-full tw:h-full tw:object-cover tw:block"
                          />
                          {tile.ready ? (
                            <span className="tw:absolute tw:top-3 tw:start-3">
                              <DS.Badge tone="solid">
                                <>{v.t?.ready}</>
                              </DS.Badge>
                            </span>
                          ) : null}
                        </span>
                        <span className="tw:flex tw:items-baseline tw:justify-between tw:gap-3">
                          <span className="tw:flex tw:flex-col">
                            <span
                              className="tw:font-display tw:text-xl tw:tracking-display"
                              dir="ltr"
                            >
                              <>{tile.code}</>
                            </span>
                            <span className="tw:text-sm tw:text-quiet">
                              <>{tile.soldOut ? tile.kind + ' · ' + v.t?.soldOut : tile.kind}</>
                            </span>
                          </span>
                          {v.showPrices ? <DS.Price value={tile.price} size="md" /> : null}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <DS.Lightbox
            label={v.t?.viewer}
            items={list(v.viewer).map(item => ({
              id: item.id,
              images: item.images,
              caption: (
                <div className="tw:flex tw:items-baseline tw:gap-4 tw:flex-wrap">
                  <span className="tw:font-display tw:text-3xl tw:tracking-display" dir="ltr">
                    <>{item.code}</>
                  </span>
                  <span className="tw:text-inverse-quiet">
                    <>{item.soldOut ? item.kind + ' · ' + v.t?.soldOut : item.kind}</>
                  </span>
                  {v.showPrices ? (
                    <span className="tw:text-xl">
                      <DS.Price value={item.price} />
                    </span>
                  ) : null}
                </div>
              )
            }))}
            index={v.open}
            onIndexChange={v.setOpen}
            onClose={v.closeViewer}
            actions={item => (
              <DS.Button variant="primary" iconStart="send" onClick={() => v.sendTo(item.id)}>
                <>{v.t?.send}</>
              </DS.Button>
            )}
          />
          <DS.Dialog open={!!v.send} onClose={v.closeSend} title={v.send?.title} maxWidth={400}>
            {v.send ? (
              <div className="tw:flex tw:flex-col tw:gap-4">
                <Qr text={v.send.url} label={v.send.qrLabel} />
                <p className="tw:m-0">
                  <>{v.t?.sendBody}</>
                </p>
                <div className="tw:flex tw:gap-3 tw:flex-wrap">
                  <DS.Button
                    variant="secondary"
                    iconStart="message-circle"
                    href={v.send.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <>{v.t?.whatsapp}</>
                  </DS.Button>
                  <DS.Button variant="secondary" iconStart="copy" onClick={v.send.copy}>
                    <>{v.send.copied ? v.t?.copied : v.t?.copy}</>
                  </DS.Button>
                </div>
              </div>
            ) : null}
          </DS.Dialog>
          <DS.Dialog
            open={v.settingsOpen}
            onClose={v.closeSettings}
            title={v.t?.settings}
            maxWidth={400}
            footer={
              <>
                <DS.Button variant="secondary" href={v.href?.home}>
                  <>{v.t?.leave}</>
                </DS.Button>
                <DS.Button variant="primary" onClick={v.closeSettings}>
                  <>{v.t?.done}</>
                </DS.Button>
              </>
            }
          >
            <div className="tw:flex tw:flex-col tw:gap-4">
              <DS.Switch
                label={v.t?.showPrices}
                checked={v.settings?.showPrices}
                onChange={v.setShowPrices}
              />
              <DS.Switch
                label={v.t?.readyOnly}
                checked={v.settings?.readyOnly}
                onChange={v.setReadyOnly}
              />
              <DS.Switch
                label={v.t?.keepAwake}
                checked={v.settings?.keepAwake}
                onChange={v.setKeepAwake}
              />
              {v.canFullscreen ? (
                <DS.Switch
                  label={v.t?.fullscreen}
                  checked={v.fullscreen}
                  onChange={v.setFullscreen}
                />
              ) : null}
            </div>
          </DS.Dialog>
        </main>
      }
      sticky={<></>}
    />
  );
}
