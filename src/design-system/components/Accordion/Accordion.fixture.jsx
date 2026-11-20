import React from 'react';
import {Accordion} from './Accordion.jsx';

export function Fixture() {
  const [openPanels, setOpenPanels] = React.useState(['care']);
  return (
    <div>
      <Accordion
        value={openPanels}
        onChange={setOpenPanels}
        items={[
          {id: 'care', title: 'Flower care', content: 'Trim the stems.'},
          {id: 'returns', title: 'Returns', content: 'Within a day.'}
        ]}
      />
      <Accordion
        allowMultiple
        headingLevel={4}
        items={[
          {id: 'water', title: 'Water', content: 'Change it daily.'},
          {id: 'light', title: 'Light', content: 'Out of direct sun.'}
        ]}
      />
      <output data-test="panels">{openPanels.join(',')}</output>
    </div>
  );
}
