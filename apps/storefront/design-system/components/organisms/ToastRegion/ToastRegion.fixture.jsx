import React from 'react';
import {Button} from '../../atoms/Button/Button.jsx';
import {ToastQueue, ToastRegion} from './ToastRegion.jsx';

const queue = new ToastQueue();

export function Fixture() {
  return (
    <div>
      <Button
        onClick={() =>
          queue.add({tone: 'success', title: 'Added to your bag', message: 'Wild Meadow'})
        }
      >
        Add
      </Button>
      <Button
        onClick={() =>
          queue.add(
            {title: 'Removed from your bag', action: {label: 'Undo', onClick: () => {}}},
            {timeout: 50}
          )
        }
      >
        Remove
      </Button>
      <Button onClick={() => queue.add({title: 'Code copied'}, {timeout: 50})}>Copy</Button>
      <ToastRegion queue={queue} label="Notifications" />
    </div>
  );
}
