import {PHASE_DEVELOPMENT_SERVER} from 'next/constants.js';
import {VF_STORE} from './src/storefront/store/store-config.js';

const basePath = process.env.VF_BASE_PATH || '';

export default function config(phase) {
  const dev = phase === PHASE_DEVELOPMENT_SERVER;
  const demo = process.env.VF_NEXT_EXPORT === '1';
  if (demo && VF_STORE.apiBase.trim())
    throw new Error(
      'Set VF_API_BASE on the server deployment. The demo requires an empty VF_STORE.apiBase.'
    );
  return {
    ...(demo
      ? {output: 'export'}
      : {
          async redirects() {
            return [
              {source: '/', destination: '/' + VF_STORE.languages[0] + '/', permanent: false}
            ];
          }
        }),
    distDir: demo ? '.generated/export' : dev ? '.next' : '.next-live',
    // Next.js references the current build's route validators through next-env.d.ts.
    experimental: {strictRouteTypes: true},
    agentRules: false,
    basePath,
    trailingSlash: true,
    poweredByHeader: false,
    env: {
      NEXT_PUBLIC_VF_BASE_PATH: basePath,
      NEXT_PUBLIC_VF_RENDER_TIME: process.env.VF_RENDER_TIME || String(Date.now()),
      NEXT_PUBLIC_VF_NEXT_EXPORT: String(demo)
    },
    turbopack: {root: import.meta.dirname}
  };
}
