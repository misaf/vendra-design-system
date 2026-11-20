import path from 'node:path';
import {PHASE_DEVELOPMENT_SERVER} from 'next/constants.js';
import {VF_STORE} from './shared/domain/store-config.js';

const basePath = process.env.VF_BASE_PATH || '';

export default function config(phase) {
  const dev = phase === PHASE_DEVELOPMENT_SERVER;
  const demo = process.env.VF_NEXT_EXPORT === '1';
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
    distDir: demo ? 'next/out' : dev ? '.next' : '.next-live',
    // The export type check excludes route validators left over from a previous dev run.
    typescript: {
      tsconfigPath: dev
        ? 'tsconfig.next.json'
        : demo
          ? 'tsconfig.export.json'
          : 'tsconfig.live.json'
    },
    agentRules: false,
    basePath,
    trailingSlash: true,
    poweredByHeader: false,
    env: {
      NEXT_PUBLIC_VF_BASE_PATH: basePath,
      NEXT_PUBLIC_VF_RENDER_TIME: process.env.VF_RENDER_TIME || String(Date.now()),
      NEXT_PUBLIC_VF_NEXT_EXPORT: String(demo)
    },
    turbopack: {root: path.resolve(import.meta.dirname, '../..')}
  };
}
