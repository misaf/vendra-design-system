import path from 'node:path';
import {PHASE_DEVELOPMENT_SERVER} from 'next/constants.js';
import {VF_STORE} from '../shared/domain/store-config.js';

const basePath = process.env.VF_BASE_PATH || '';

export default function config(phase) {
  const dev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    ...(dev
      ? {
          async redirects() {
            const destination = '/apps/storefront/app/' + VF_STORE.languages[0] + '/';
            return ['/', '/apps/storefront/app/'].map(source => ({
              source,
              destination,
              permanent: false
            }));
          }
        }
      : {output: 'export'}),
    agentRules: false,
    basePath,
    trailingSlash: true,
    poweredByHeader: false,
    env: {
      NEXT_PUBLIC_VF_BASE_PATH: basePath,
      NEXT_PUBLIC_VF_BROWSER_TEST: process.env.E2E_TARGET === 'build' ? '1' : '0'
    },
    turbopack: {root: path.resolve(import.meta.dirname, '../../..')}
  };
}
