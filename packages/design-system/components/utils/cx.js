// Joins class names, skipping empty values: cx('ag-btn', primary && 'ag-btn--primary', className).
export function cx(...names) {
  return names.filter(Boolean).join(' ');
}
