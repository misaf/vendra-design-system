import React from 'react';
import {Button} from '../Button/Button.jsx';
import {Lightbox} from './Lightbox.jsx';

const items = ['VF-1', 'VF-2', 'VF-3'].map(code => ({
  id: code,
  images: [1, 2].map(number => ({src: '/assets/placeholder.svg', alt: code + ' photo ' + number})),
  caption: <strong>{code}</strong>
}));

// Opens on the first item; <span data-test> shows what the viewer reported.
export function Fixture() {
  const [index, setIndex] = React.useState(null);
  const [sent, setSent] = React.useState('');
  return (
    <div>
      <Button variant="secondary" onClick={() => setIndex(0)}>
        Show designs
      </Button>
      <span data-test="sent">{sent}</span>
      <Lightbox
        items={items}
        index={index}
        onIndexChange={setIndex}
        onClose={() => setIndex(null)}
        actions={item => (
          <Button variant="secondary" onClick={() => setSent(item.id)}>
            Send
          </Button>
        )}
      />
    </div>
  );
}
