import React from 'react';
import {AnnouncementBar} from './AnnouncementBar.jsx';

export function Fixture() {
  const [shown, setShown] = React.useState(true);
  return (
    <div>
      {shown && (
        <AnnouncementBar label="Announcement" onClose={() => setShown(false)}>
          Free delivery in Karaj on orders over 5,000,000 Toman.
        </AnnouncementBar>
      )}
      <AnnouncementBar label="Opening hours">Open daily 08:00–22:00.</AnnouncementBar>
    </div>
  );
}
