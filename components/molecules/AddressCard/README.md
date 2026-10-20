# AddressCard

Saved address in the account's Addresses tab. Lay out in a 1-col (mobile) / 2-col grid, followed by a dashed "Add an address" `<button>` tile.

```jsx
<AddressCard
  label="Home"
  line="Azimiyeh, 14th St., No. 22, Karaj"
  recipient="Shirin Ahmadi"
  phone="0912 564 9438"
  zone="Karaj central"
  isDefault
  onEdit={edit}
  onDelete={del}
  onMakeDefault={setDefault}
  labels={{
    edit: 'Edit {name}',
    delete: 'Delete {name}',
    default: 'Default',
    makeDefault: 'Set as default'
  }}
/>
```

- Edit / delete get specific accessible names ("Edit Home", "Delete Home"); fa: `ویرایش {name}`.
- Phone renders `dir="ltr"`. "Set as default" shows only on non-default cards.

## Usage

**Use when:** Saved delivery addresses in Account and the checkout address picker.

**Don’t use when:** Don’t use for the studio’s own address (use DetailList) or for a one-off address typed at checkout.
