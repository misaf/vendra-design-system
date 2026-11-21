import {defineConfig, globalIgnores} from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    name: 'vendra/javascript',
    files: ['src/{design-system,platform/browser,storefront}/**/*.{js,jsx,mjs}'],
    rules: {
      'no-undef': 'error',
      'no-unreachable': 'error'
    }
  },
  globalIgnores(['.generated/**', '_app-build/**', 'public/**'])
]);
