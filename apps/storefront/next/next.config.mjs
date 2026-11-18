import path from 'node:path';
import {VF_STORE} from '../shared/domain/store-config.js';

export default {
  trailingSlash: true,
  poweredByHeader: false,
  turbopack: {root: path.resolve(import.meta.dirname, '../../..')},
  async redirects() {
    const destination = '/apps/storefront/app/' + VF_STORE.languages[0] + '/';
    return ['/', '/apps/storefront/app/'].map(source => ({
      source,
      destination,
      permanent: false
    }));
  }
};
