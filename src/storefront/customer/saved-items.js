export function vfToggleSavedId(ids, id) {
  return ids.includes(id) ? ids.filter(saved => saved !== id) : [...ids, id];
}

// Routed pages share the session's saved list. Standalone previews use their own sample list.
export function vfSavedItems(page, previewIds = []) {
  const store = page.props.store;
  return {
    ids: store ? store.saved : (page.state.vfFavs ?? previewIds),
    toggle(id) {
      if (store) {
        store.toggleSave(id);
        return;
      }
      page.setState(state => ({vfFavs: vfToggleSavedId(state.vfFavs ?? previewIds, id)}));
    }
  };
}
