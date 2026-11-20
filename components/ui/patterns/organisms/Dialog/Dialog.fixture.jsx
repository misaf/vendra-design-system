import React from 'react';
import {Button} from '../../../components/Button/Button.jsx';
import {Input} from '../../../components/Input/Input.jsx';
import {Dialog} from '../../../components/Dialog/Dialog.jsx';

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
