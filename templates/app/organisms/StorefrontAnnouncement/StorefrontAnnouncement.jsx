import React from 'react';
import {AnnouncementBar, Icon} from '../../ds.js';

export function StorefrontAnnouncement({label, closeLabel, onClose, text, phoneText, link}) {
  if (!text) return null;
  return (
    <AnnouncementBar label={label} closeLabel={closeLabel} onClose={onClose}>
      {phoneText !== text ? (
        <>
          <span className="tw:md:hidden">{phoneText}</span>
          <span className="tw:max-md:hidden">{text}</span>
        </>
      ) : (
        <>{text}</>
      )}
      {link ? (
        <>
          {' '}
          <a href={link.href} className="vf-shell-announcement-link">
            <>{link.label}</>
            <Icon name="arrow-right" size={14} className="ag-flip-rtl" />
          </a>
        </>
      ) : null}
    </AnnouncementBar>
  );
}
