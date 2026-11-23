import React from 'react';

function toggleSavedId(ids, id) {
  return ids.includes(id) ? ids.filter(saved => saved !== id) : [...ids, id];
}

// Routed pages share the session's saved list. A standalone preview owns its sample list.
export function useSavedItems(store) {
  const [localIds, setLocalIds] = React.useState([]);
  return {
    ids: store ? store.saved : localIds,
    toggle(id) {
      if (store) store.toggleSave(id);
      else setLocalIds(ids => toggleSavedId(ids, id));
    }
  };
}

// The pages that still use the legacy page object keep their preview state there.
export function vfSavedItems(page, previewIds = []) {
  const store = page.props.store;
  return {
    ids: store ? store.saved : (page.state.vfFavs ?? previewIds),
    toggle(id) {
      if (store) {
        store.toggleSave(id);
        return;
      }
      page.setState(state => ({vfFavs: toggleSavedId(state.vfFavs ?? previewIds, id)}));
    }
  };
}
