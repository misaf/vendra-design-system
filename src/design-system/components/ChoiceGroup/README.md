# ChoiceGroup

Grid wrapper for ChoiceTile on React Aria's RadioGroup: one Tab stop, arrow keys move and select, mirrored in RTL (it follows the page's `lang`). Each tile is a real radio input inside its label, so click the tile in tests, as people do. See [ChoiceTile](../ChoiceTile/README.md).

`legend="Delivery time"` renders `<fieldset><legend>` (legend labels the radiogroup). `hint` / `error` sit under the tiles and are linked to the radiogroup (`aria-describedby`, `aria-invalid`, `aria-errormessage`).

The group holds the choice: `value`/`defaultValue` and `onChange(value)`, with a `value` on each tile. Inside a form, give the group a `name`: the selected tile's value is posted under it.

## Usage

**Use when:** One-of-few choices shown as tiles: delivery slot, size, card type.

**Don’t use when:** Don’t use for more than ~6 options (Select) or multiple selection (Checkbox / Chip).
