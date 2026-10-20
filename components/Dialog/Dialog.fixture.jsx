import React from 'react';
import {Button} from '../atoms/Button/Button.jsx';
import {Input} from '../Input/Input.jsx';
import {Dialog} from './Dialog.jsx';

export function Fixture() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Delivery details
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delivery details"
        footer={<Button onClick={() => setOpen(false)}>Save</Button>}
      >
        <Input id="recipient" label="Recipient" />
      </Dialog>
    </div>
  );
}
