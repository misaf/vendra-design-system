import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPostBlocks({blocks}) {
  return (
    <>
      {blocks.map((b, $index) => (
        <React.Fragment key={$index}>
          {b?.paragraph ? (
            <>
              <p>
                <>{b?.value}</>
              </p>
            </>
          ) : null}
          {b?.heading ? (
            <>
              <h2>
                <>{b?.value}</>
              </h2>
            </>
          ) : null}
          {b?.quote ? (
            <>
              <blockquote>
                <>{b?.value}</>
              </blockquote>
            </>
          ) : null}
          {b?.image ? (
            <>
              <figure>
                <DS.Picture
                  image={b?.photo}
                  alt={b?.caption}
                  sizes="(max-width: 760px) 100vw, 720px"
                  className="tw:w-full tw:h-auto tw:rounded-md"
                />
                <figcaption className="tw:text-sm tw:text-quiet">
                  <>{b?.caption}</>
                </figcaption>
              </figure>
            </>
          ) : null}
          {b?.tips ? (
            <>
              <div className="tw:bg-sunken tw:p-5 tw:rounded-md">
                <ul>
                  {b.tipsItems.map((tip, $index) => (
                    <React.Fragment key={$index}>
                      <li>
                        <>{tip}</>
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </React.Fragment>
      ))}
    </>
  );
}
