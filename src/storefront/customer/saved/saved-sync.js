import {vfRuntime} from '../../../platform/browser/runtime.js';
import {vfProduct} from '../../catalog/catalog.js';
import {vfCustomerId} from '../account-data.js';

// A new scope on every customer switch also invalidates requests from an earlier visit
// by the same customer. The storage check covers identity changes before the page sees them.
export function createSavedSync(page) {
  let active;
  function scope() {
    if (!active) {
      const customerId = page.state.customerId;
      const current = {
        customerId,
        owns: () => active === current && page._mounted !== false && customerId === vfCustomerId(),
        started: false,
        loading: false,
        edits: new Map(),
        errors: new Set(),
        writeVersions: new Map(),
        settledVersions: new Map(),
        announcement: ''
      };
      active = current;
    }
    return active;
  }

  function report(current, key, failed, announce = false) {
    if (!current.owns()) return;
    if (failed) current.errors.add(key);
    else current.errors.delete(key);
    const patch = {integrationError: current.errors.size > 0};
    if (failed && announce) {
      current.announcement =
        page.state.lang === 'fa'
          ? 'ذخیره در سرور انجام نشد؛ فهرست محلی حفظ شد.'
          : 'Server sync failed; your local saved list is kept.';
      patch.announcement = current.announcement;
    } else if (!patch.integrationError && page.state.announcement === current.announcement) {
      patch.announcement = '';
    }
    page.setState(patch);
  }

  function load() {
    if (!page._mounted || !page._restored || !vfRuntime.api?.live) return;
    const current = scope();
    if (current.started || !current.owns()) return;
    current.started = true;
    current.loading = true;
    vfRuntime.api
      .loadSaved(current)
      .then(saved => {
        if (!current.owns() || saved == null) return;
        const merged = new Set(saved);
        for (const [id, keep] of current.edits) {
          if (keep) merged.add(id);
          else merged.delete(id);
        }
        page.setState({saved: [...merged]});
        report(current, null, false);
      })
      .catch(() => report(current, null, true))
      .finally(() => {
        current.loading = false;
        current.edits.clear();
      });
  }

  function setSaved(ids) {
    const current = scope();
    if (!current.owns()) return;
    if (current.loading) {
      const previous = new Set(page.state.saved);
      const next = new Set(ids);
      for (const id of new Set([...previous, ...next])) {
        if (previous.has(id) !== next.has(id)) current.edits.set(id, next.has(id));
      }
    }
    page.setState({saved: ids});
  }

  async function toggle(id) {
    const current = scope();
    if (!current.owns()) return;
    const saved = page.state.saved;
    const removing = saved.includes(id);
    setSaved(removing ? saved.filter(savedId => savedId !== id) : [...saved, id]);
    if (!removing)
      vfRuntime.track.event('add_to_wishlist', {
        items: [vfRuntime.track.item(vfProduct(id))]
      });
    const version = (current.writeVersions.get(id) || 0) + 1;
    current.writeVersions.set(id, version);
    const settle = failed => {
      if (!current.owns() || version < (current.settledVersions.get(id) || 0)) return;
      current.settledVersions.set(id, version);
      report(current, id, failed, failed);
    };
    try {
      const api = vfRuntime.api;
      const result = await (removing ? api.unsaveItem(id, current) : api.saveItem(id, current));
      // Local-only actions and empty responses do not confirm server recovery.
      if (result != null) settle(false);
    } catch {
      settle(true);
    }
  }

  return {
    load,
    toggle,
    setSaved,
    get loading() {
      return !!active?.loading;
    },
    reset() {
      active = undefined;
    }
  };
}
