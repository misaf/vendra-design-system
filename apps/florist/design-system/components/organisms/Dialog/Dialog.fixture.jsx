import React from 'react';
import {Button} from '@vendra/ui/Button';
import {Input} from '@vendra/ui/Input';
import {Dialog} from '@vendra/ui/Dialog';

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
