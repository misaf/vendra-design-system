import 'server-only';
import {connection} from 'next/server';
import {VF_STORE} from '../../storefront/store/store-config.js';

export async function liveCatalogBase() {
  if (process.env.NEXT_PUBLIC_VF_NEXT_EXPORT === 'true') return '';
  // Read the deployment's configuration at request time, including when the image was built
  // without a backend. Static exports always stay in demo mode.
  await connection();
  return (process.env.VF_API_BASE?.trim() || VF_STORE.apiBase).trim();
}
