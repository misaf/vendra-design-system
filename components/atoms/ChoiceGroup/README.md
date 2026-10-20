# ChoiceGroup

Grid wrapper for ChoiceTile on React Aria's RadioGroup: one Tab stop, arrow keys move and select, mirrored in RTL (it follows the page's `lang`). Each tile is a real radio input inside its label, so click the tile in tests, as people do. See ChoiceTile.

`legend="Delivery time"` renders `<fieldset><legend>` (legend labels the radiogroup). `hint` / `error` sit under the tiles and are linked to the radiogroup (`aria-describedby`, `aria-invalid`, `aria-errormessage`).

The group holds the choice: `value`/`defaultValue` and `onChange(value)`, with a `value` on each tile. Inside a form, give the group a `name`: the selected tile's value is posted under it.

## Usage

**Use when:** One-of-few choices shown as tiles: delivery slot, size, card type.

**Don’t use when:** Don’t use for more than ~6 options (Select) or multiple selection (Checkbox / Chip).

# ChoiceTile

Selectable tile for delivery slots and zones. Selected = ink fill. Always inside ChoiceGroup (radiogroup + arrow keys), which holds the value.

```jsx
<ChoiceGroup label="Delivery time" columns={2} value={slot} onChange={setSlot}>
  {slots.map(s => (
    <ChoiceTile key={s.id} value={s.id} label={s.label} description={s.fee} />
  ))}
</ChoiceGroup>
```

Screen readers name the tile by `label` alone and read `description` after it, so a full slot is announced as "08:00–12:00, Closed" without the reason becoming its name.

## Usage

**Use when:** Single tile inside ChoiceGroup. `disabled` for slots that are full, with the reason in `description`.

**Don’t use when:** Don’t use on its own as a button.
